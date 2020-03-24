<?php

namespace App\Http\Middleware;

use App\User;
use Closure;
use Illuminate\Support\Facades\Hash;

class AppAuthenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $request->bearerToken();

        if (is_null($token))
            $token = $request->get('token');

        $user = User::query()->where('token', $token)->first();

        if (!$user)
            abort(403, "User not found for token $token");

        auth()->setUser($user);

        return $next($request);
    }
}
