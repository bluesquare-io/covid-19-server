<?php


namespace App;


use Illuminate\Database\Eloquent\Model;

class Pharmacy extends Model
{
    public function marker()
    {
        return $this->morphOne('App\Marker', 'markable');
    }
}
