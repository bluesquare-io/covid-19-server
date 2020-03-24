<?php

namespace App\Console\Commands;

use App\Article;
use App\NewsFeed;
use Illuminate\Console\Command;

class ArticlesFill extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'articles:fill';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fills Article table from NewsFeed';

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
        $news_feeds = NewsFeed::query()->whereNull('deleted_at')->get();

        $counter = 0;
        foreach ($news_feeds as $news_feed)
        {
            $content = @file_get_contents($news_feed->source);

            if (!$content)
                continue;

            $rss = new \SimpleXMLElement($content);
            $channel = $rss->channel;

            if (!$channel)
                continue;

            $items = $channel->item;

            if (!$items)
                continue;

            foreach ($items as $item) {

                $title = html_entity_decode($item->title, ENT_QUOTES | ENT_XML1, 'UTF-8');

                $database_article_exists = Article::query()
                    ->where('title', $title)
                    ->where('news_feed_id', $news_feed->id)
                    ->exists();

                if ($database_article_exists)
                    continue;

                $article = new Article();

                $publication_date = $item->pubDate;
                $publication_date = date("Y-m-d H:i:s", strtotime($publication_date));

                $article->title = $title;
                $article->description = html_entity_decode($item->description, ENT_QUOTES | ENT_XML1, 'UTF-8');
                $article->source = $item->link;
                $article->published_at = $publication_date;
                $article->news_feed_id = $news_feed->id;

                $article->save();

                $counter = $counter + 1;
            }
        }

        echo $counter . ' imported articles.';

        return true;
    }
}
