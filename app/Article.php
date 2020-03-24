<?php


namespace App;


use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    public $timestamps = false;

    public function news_feed()
    {
        return $this->belongsTo(NewsFeed::class, 'news_feed_id', 'id');
    }
}
