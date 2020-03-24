<?php

namespace App\Console\Commands;

use App\Hospital;
use App\Jobs\GeocodeAddress;
use App\Pharmacy;
use Illuminate\Console\Command;

class UpdateGeocode extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:geocode:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Dispatch geocode for all pharmacies and hospitals';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $pharmacies = Pharmacy::all();
        $hospitals = Hospital::all();

        $this->info('Update geocode for pharmacies');
        $barPharmacies = $this->output->createProgressBar(count($pharmacies));
        /** @var Pharmacy $pharmacy */
        foreach ($pharmacies as $pharmacy) {
            if ($pharmacy->address && (!$pharmacy->marker || ($pharmacy->marker && $pharmacy->marker->latitude || !$pharmacy->marker->longitude))) {
                GeocodeAddress::dispatch($pharmacy);
            }
            $barPharmacies->advance();
        }
        $barPharmacies->finish();

        $this->info('Update geocode for hospitals');
        $barHospitals = $this->output->createProgressBar(count($hospitals));
        /** @var Hospital $hospital */
        foreach ($hospitals as $hospital) {
            if ($hospital->address && (!$hospital->marker || ($hospital->marker && $hospital->marker->latitude || !$hospital->marker->longitude))) {
                GeocodeAddress::dispatch($hospital);
            }
            $barHospitals->advance();
        }
        $barHospitals->finish();
    }
}
