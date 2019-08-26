<?php

namespace App\Http\Controllers;

use App\Email;
use Illuminate\Http\Request;

class EmailsController extends Controller
{
    // public function index()
    // {
    //     return view('emails');
    // }
    public function index()
    {
        $emails = Email::orderBy('created_at', 'desc')->get();

        // return view('emails_list');
        // return view('emails_list', ['emails', $emails]);
        return view('emails_list')->withEmails($emails);
    }

    public function list()
    {
        $emails = Email::orderBy('created_at', 'desc')->get();
        return $emails->toJson();
    }

    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'subject' => 'required',
            'body' => 'required',
        ]);

        // updateOrCreate

        $email = Email::create([
            'subject' => $validatedData['subject'],
            'body' => $validatedData['body'],
            'user_id' => '1',
        ]);

        return response()->json('Email created!');
    }

    public function save()
    {

    }

    public function view(Request $request)
    {
        $email = Email::where('id', $request->id)
            ->orderBy('created_at', 'desc')->first();
        
        return $email->toJson();
    }

}
