<!DOCTYPE html>
<html lang="en">

<head>

    @yield('title')

    @include('include.header')

    @stack('style')
</head>

<body>
    <!-- [ Pre-loader ] start -->
    <div class="loader-bg">
        <div class="loader-track">
            <div class="loader-fill"></div>
        </div>
    </div>
    <!-- [ Pre-loader ] End -->

    <!-- [ Sidebar Menu ] start -->
    @include('include.sidebar')
    <!-- [ Sidebar Menu ] end -->

    <!-- [ Header Topbar ] start -->
    @include('include.navbar')
    <!-- [ Header Topbar ] end -->

    <!-- [ Main Content ] start -->
    <div class="pc-container">
        <div class="pc-content">
            <main>
                @yield('content')
            </main>
        </div>
    </div>
    <!-- [ Main Content ] end -->
@include('include.footer')

@include('include.script')

@yield('scripts')

@stack('script')

</body>

</html>