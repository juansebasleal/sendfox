<?php

namespace App\Http\Controllers;

use App\Email;
use Illuminate\Support\Facades\Auth;
use App\Paginator;
use Illuminate\Http\Request;

class EmailsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except(['create', 'view']);
    }

    /**
     * Main page, list of emails
     * currently it does not use React
     */
    public function index(Request $request)
    {
        $this->paginator = new Paginator(
            count(Email::select('id')->where('user_id', Auth::id())->get())
        );

        $pageId = $request->page_id ?: 1;

        // Retrieve emails dependending on the page number
        $emails = Email::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->skip($this->paginator->getSkipValue($pageId))
            ->take($this->paginator->getPageSize())
            ->get();

        // Return the list of emails
        // and the total number of pages
        return view('emails_list')
            ->withEmails($emails)
            ->withPaginationValues([
                'totalSize' => $this->paginator->getPagesNumber(),
            ]);
    }

    /**
     * For future use
     * List all the emails, usable by React listing component
     */
    public function list()
    {
        $emails = Email::orderBy('created_at', 'desc')->get();
        return $emails->toJson();
    }

    /**
     * Method to create or update emails
     */
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'subject' => 'required',
            // 'body' => 'required',
        ]);

        $email = Email::updateOrCreate(
            [
                'id' => $request->emailId,
            ],
            [
                'subject' => $validatedData['subject'],
                // 'body' => $validatedData['body'],
                'body' => $request->body,
                'user_id' => $request->userId
            ]
        );

        return response()->json('Email created!');
    }

    /**
     * Retrieve info of a single email
     */
    public function view(Request $request)
    {
        $email = Email::where('id', $request->id)
            ->orderBy('created_at', 'desc')->first();

        return $email->toJson();
    }

    /**
     * Controller that show the react app that creates and updates emails
     */
    public function management()
    {
        return view('emails')
            ->withUserId(Auth::id());
    }

}
