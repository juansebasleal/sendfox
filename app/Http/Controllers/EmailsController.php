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
        return $emails->toJson();
    }

    public function list()
    {
        $emails = Email::orderBy('created_at', 'desc')->get();
        return $emails->toJson();
    }

    public function new()
    {

    }

    public function save()
    {

    }

    public function show()
    {

    }
}
