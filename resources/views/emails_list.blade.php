@extends('layouts.app')

@section('jsapp')
<script>
      let AppModule="EMAIL_LIST"
</script>
<script src="{{ asset('js/app.js') }}" defer></script>
@endsection

@section('content')
<div class='container py-4'>
  <div class='row justify-content-center'>
    <div class='col-md-8'>
      <div class='card'>
        <div class='card-header'>All e-mails (from newest to oldest)</div>
        <div class='card-body'>

          <!-- link create new email -->
          <a class='btn btn-primary btn-sm mb-3' href="{{ url('/emails/create') }}">
            Create new Email
          </a>

          <ul class='list-group list-group-flush'>
              @foreach ($emails as $email)
                  <span class='list-group-item list-group-item-action d-flex justify-content-between align-items-center'>
                      <a href="{{ url('/emails/view/' . $email->id) }}">{{ $email->id }}</a>
                      {{ str_limit($email->subject, $limit = 80, $end = ' (...)') }}
                  </span>
              @endforeach
          </ul>
        </div>
        <div class='card-footer'>

          @for ($i = 1; $i <= $paginationValues['totalSize']; $i++)
            <a href="{{ url('/emails_list?page_id=' . $i) }}">{{ $i }}</a>
          @endfor

        </div>
      </div>
    </div>
  </div>
</div>
@endsection