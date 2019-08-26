<!DOCTYPE html>
    <html lang="{{ app()->getLocale() }}">
    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Emails Management (only view)</title>
        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    </head>
    <body>





        <div class='container py-4'>
        <div class='row justify-content-center'>
          <div class='col-md-8'>
            <div class='card'>
              <div class='card-header'>All e-mails</div>
              <div class='card-body'>

                <!-- link create new email -->

                <ul class='list-group list-group-flush'>
                    @foreach ($emails as $email)
                        <span class='list-group-item list-group-item-action d-flex justify-content-between align-items-center'>
                        {{ $email->subject }}
                        </span>
                    @endforeach
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>




    </body>
</html>