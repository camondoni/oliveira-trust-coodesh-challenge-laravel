<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Http\Response;
use Validator;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request)
    {
        $columns_validate = [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ];

        $validator = Validator::make($request->all(), $columns_validate);
        if ($validator->fails()) {
            return response()->json([
                'error' => true,
                'data' => [],
                'errorMessages' => $validator->errors()->all()
            ], Response::HTTP_BAD_REQUEST);
        }

        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);

        if (!$token) {
            return response()->json([
                'error' => true,
                'message' => 'Email ou senha inválidos',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $credentials = request(['email', 'password']);
        $user = Auth::user();

        return response()->json([
            'error' => false,
            'token' => $token,
            'type' => 'bearer',
            'userName' =>   $user['name']
        ]);
    }

    public function register(Request $request)
    {
        $columns_validate = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ];

        $validator = Validator::make($request->all(), $columns_validate);
        if ($validator->fails()) {
            return response()->json([
                'error' => true,
                'data' => [],
                'errorMessages' => $validator->errors()->all()
            ], Response::HTTP_BAD_REQUEST);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = Auth::login($user);
        return response()->json([
            'error' => false,
            'errorMessages' => [],
            'data' => $user,
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'error' => false
        ]);
    }
}
