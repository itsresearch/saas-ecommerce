@extends('layout.app')

@section('title')
    <title>SaaS Commerce Admin | Dashboard</title>
@endsection

@section('content')
    <div class="pc-content-header">
        <div class="pc-head-title">
            <h2 class="mb-0">Dashboard</h2>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <p class="mb-0 text-muted">{{ __("You're logged in!") }}</p>
                </div>
            </div>
        </div>
    </div>
@endsection
