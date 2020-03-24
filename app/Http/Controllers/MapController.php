<?php


namespace App\Http\Controllers;


use App\Hospital;
use App\Marker;
use App\Pharmacy;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MapController extends Controller
{
    public function track(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'position' => 'required',
            'position.latitude' => 'required|numeric',
            'position.longitude' => 'required|numeric',
        ]);

        $position = $validated['position'];

        $marker = new Marker;
        $marker->fill($position);
        $marker->markable()->associate($user);
        $marker->recorded_at = now();
        $marker->save();

        return [];
    }

    public function region(Request $request)
    {
        $validated = $request->validate([
            'region' => 'required',
            'region.latitude' => 'required|numeric',
            'region.longitude' => 'required|numeric',
            'region.latitudeDelta' => 'required|numeric',
            'region.longitudeDelta' => 'required|numeric',
        ]);

        $region = $validated['region'];

        $markers = Marker::query()
            ->where('latitude', '>=', $region['latitude'] - $region['latitudeDelta'])
            ->where('latitude', '<=', $region['latitude'] + $region['latitudeDelta'])
            ->where('longitude', '>=', $region['longitude'] - $region['longitudeDelta'])
            ->where('longitude', '<=', $region['longitude'] + $region['longitudeDelta'])
            ->groupBy(['markable_type', 'markable_id'])
            ->orderBy('recorded_at', 'desc')
            ->get();

        $data = [];

        foreach ($markers as $marker) {
            $data[] = $this->formatEntity($marker);
        }

        return $data;
    }

    protected function formatEntity(Marker $marker)
    {
        $markable_id = $marker->markable_id;
        $markable_type = $marker->markable_type;

        $id = $entity = $type = $color = null;

        switch($markable_type)
        {
            case Hospital::class:
                $id = 'hospital-' . $markable_id;
                $entity = Hospital::find($markable_id);
                $type = 'pin';
                $color = 'blue';
                break;
            case Pharmacy::class:
                $id = 'pharmacy-' . $markable_id;
                $entity = Pharmacy::find($markable_id);
                $type = 'pin';
                $color = 'red';
                break;
            case User::class:
                $id = 'people-' . md5(uniqid());
                $entity = User::find($markable_id);
                $type = 'circle';
                $color = 'rgba(0,0,0,0.2)';
                break;
        }

        $formatted = [];

        if ($entity instanceof Hospital || $entity instanceof Pharmacy)
        {
            $formatted = [
                'id' => $id,
                'type' => $type,
                'latitude' => $marker->latitude,
                'longitude' => $marker->longitude,
                'color' => $color,
                'title' => $entity->name,
                'description' => $entity->description,
                'popup' => [
                    'name' => $entity->name,
                    'address' => $entity->address,
                    'zipcode' => $entity->zipcode,
                    'city' => $entity->city,
                    'country' => $entity->country,
                    'phone' => $entity->phone
                ]
            ];

        }
        elseif ($entity instanceof User) {
            $formatted = [
                'id' => $id,
                'type' => $type,
                'latitude' => $marker->latitude,
                'longitude' => $marker->longitude,
                'color' => $color,
                'radius' => 1000,
            ];
        }

        return $formatted;
    }
}
