@extends('welcome')

@section('content')
<h2>
    Owner form
</h2>
<form method="post" action="{{@url('step_one')}}">
    @csrf
    <label for="email" class="block">
          <span class="block text-lg font-medium text-slate-700">Your email<span>
        <input
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" type="email"
            id="email"
            placeholder="johndoe@doe.com"
            name="email"
        />
    </label>
    <input type="submit" value="Start" />
</form>
@endsection
