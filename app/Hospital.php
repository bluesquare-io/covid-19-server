<?php


namespace App;


use Illuminate\Database\Eloquent\Model;

class Hospital extends Model
{
    public function marker()
    {
        return $this->morphOne('App\Marker', 'markable');
    }
}
