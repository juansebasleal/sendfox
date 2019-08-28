@extends('layouts.app')

@section('jsapp')
<script>
      let AppModule="EMAIL_MANAGEMENT"
</script>
<script src="{{ asset('js/app.js') }}" defer></script>
@endsection

@section('content')
<div id="emails"></div>
<!-- Send user id via js var so that it can be used in our React components -->
<script>
      let UserId='{{ $userId }}'
</script>
@endsection
