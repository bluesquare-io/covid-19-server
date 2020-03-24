<?php

namespace App\Jobs;

use App\Marker;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class GeocodeAddress implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $model;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $url = 'https://nominatim.openstreetmap.org/search?limit=1&format=json&email='.urlencode('contact@bluesquare.io').
            '&street='.urlencode($this->model->address).
            '&city='.urlencode($this->model->city).
            '&postalcode='.urlencode($this->model->zipcode).
            '&country='.urlencode($this->model->country);

        $json = file_get_contents($url);
        $data = json_decode($json);

        if (is_array($data) && count($data))
        {
            $details = $data[0];

            // Earth’s radius, sphere
            $R = 6378137;

            // offsets in meters
            $dn = 5000;
            $de = 5000;

            $lat = $details->lat;
            $lon = $details->lon;

            // Coordinate offsets in radians
            $dLat = $dn / $R;
            $dLon = $de / ($R * cos(pi() * $lat / 180));

            // OffsetPosition, decimal degrees
            $lat = $lat + $dLat * 180 / pi();
            $lon = $lon + $dLon * 180 / pi();

            $marker = new Marker([
                'latitude' => $lat,
                'longitude' => $lon,
            ]);

            $marker->markable()->associate($this->model);
            $marker->save();

            $this->model->marker()->save($marker);
        }
    }
}
