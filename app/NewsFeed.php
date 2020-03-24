<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NewsFeed extends Model
{
    protected $table = 'news_feeds';

    public function articles()
    {
        return $this->hasMany(Article::class, 'news_feed_id');
    }
}
