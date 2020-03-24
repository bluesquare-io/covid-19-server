<?php


namespace App\Http\Controllers\Auth;


use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class VerificationController extends Controller
{
    public function token(Request $request)
    {
        $validated = $request->validate([
            'device_uuid' => 'required'
        ]);

        $user = User::query()->where('device_uuid', $validated['device_uuid'])->first();
        $token = md5(Str::random(30));

        if (!$user) {
            $user = new User();
            $user->device_uuid = $validated['device_uuid'];
        }

        $user->token = $token;
        $user->save();

        return [
            'token' => $token
        ];
    }

    public function deleteToken(Request $request)
    {
        /** @var User $user */
        $user = $request->user();

        $user->markers()->delete();

        $user->delete();

        return ['success' => true];
    }
}
