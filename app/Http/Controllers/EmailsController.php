<?php

namespace App\Http\Controllers;

use App\Email;
use App\Paginator;
use Illuminate\Http\Request;

class EmailsController extends Controller
{

    // public function index()
    // {
    //     return view('emails');
    // }

    public function __construct()
    {
        // $this->paginator = new Paginator(App\Email);
        $this->paginator = new Paginator(Email::count());
    }

    public function index(Request $request)
    {

        $pageId = $request->page_id ?: 1;

        $emails = Email::orderBy('created_at', 'desc')
            ->skip($this->paginator->getSkipValue($pageId))
            ->take($this->paginator->getPageSize())
            ->get();


        return view('emails_list')
        ->withEmails($emails)
        ->withPaginationValues([
            'totalSize' => $this->paginator->getPagesNumber(),
        ]);
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

        // $email = Email::create([
        //     'subject' => $validatedData['subject'],
        //     'body' => $validatedData['body'],
        //     'user_id' => '1',
        // ]);
        // $email = Email::firstOrCreate([
        //     'id' => $request->emailId,
        //     'subject' => $validatedData['subject'],
        //     'body' => $validatedData['body'],
        //     'user_id' => '1',
        // ]);
        $user = Email::updateOrCreate(
            [
                'id' => $request->emailId,
            ],
            [
                'subject' => $validatedData['subject'],
                'body' => $validatedData['body'],
                'user_id' => '1'
            ]
        );

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
