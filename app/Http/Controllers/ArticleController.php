<?php


namespace App\Http\Controllers;


use App\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $page = max(1, intval($request->get('page')));
        $limit = 15;

        $articles = Article::query()
            ->with('news_feed')
            ->offset(($page - 1) * $limit)
            ->limit($limit)
            ->get();

        return [
            'page' => $page,
            'data' => $articles
        ];
    }
}
