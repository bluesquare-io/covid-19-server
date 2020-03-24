<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class InfosController extends Controller
{
    public function index(Request $request)
    {
        $user = User::query()->where('token', $request->get('token'))->first();

        if ($user)
            auth()->setUser($user);

        return view('infos');
    }
}
