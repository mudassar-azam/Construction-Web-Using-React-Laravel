<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthenticationController extends Controller
{
    public function authenticate(Request $request){
        $validar = Validator::make($request->all(),[
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if($validar->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validar->errors()
            ]);
        }else{
            $credentials = [
                'email' => $request->email,
                'password' => $request->password,
            ];
            if(Auth::attempt($credentials)){

                $user = User::find(Auth::user()->id);
                $token = $user->createToken('token')->plainTextToken;
                return response()->json([
                    'status' => true,
                    'token' => $token,
                    'id' => $user->id
                ]);

            }else{
                return response()->json([
                    'status' => false,
                    'errors' => $validar->errors()
                ]);
            }
        }

    }
}
