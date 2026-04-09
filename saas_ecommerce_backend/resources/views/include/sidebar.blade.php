<nav class="pc-sidebar">
    <div class="navbar-wrapper">
        <div class="m-header">
            <a href="{{ url('/') }}" class="b-brand text-primary">
                <!-- ========   Change your logo from here   ============ -->
                <img src="{{ asset('assets/images/logo-dark.svg') }}" alt="" class="logo logo-lg" />
            </a>
        </div>
        <div class="navbar-content">
            <ul class="pc-navbar">
                <li class="pc-item pc-caption">
                    <label>Workspace</label>
                    <i class="ti ti-app-window"></i>
                </li>
                <li class="pc-item">
                    <a href="#saas-dashboard" class="pc-link">
                        <span class="pc-micon"><i class="ti ti-dashboard"></i></span>
                        <span class="pc-mtext">Dashboard</span>
                    </a>
                </li>

                <li class="pc-item pc-hasmenu">
                    <a href="#!" class="pc-link">
                        <span class="pc-micon"><i class="ti ti-building-store"></i></span>
                        <span class="pc-mtext">POS</span>
                        <span class="pc-arrow"><i data-feather="chevron-right"></i></span>
                    </a>
                    <ul class="pc-submenu">
                        <li class="pc-item"><a class="pc-link" href="#pos">New Sale</a></li>
                        <li class="pc-item"><a class="pc-link" href="#pos-sessions">Sessions</a></li>
                        <li class="pc-item"><a class="pc-link" href="#cash-management">Cash Management</a></li>
                        <li class="pc-item"><a class="pc-link" href="#pos-receipts">Receipts</a></li>
                    </ul>
                </li>

        <li class="pc-item pc-caption">
          <label>Commerce</label>
          <i class="ti ti-shopping-cart"></i>
        </li>
        <li class="pc-item pc-hasmenu">
          <a href="#!" class="pc-link">
            <span class="pc-micon"><i class="ti ti-package"></i></span>
            <span class="pc-mtext">Products</span>
            <span class="pc-arrow"><i data-feather="chevron-right"></i></span>
          </a>
          <ul class="pc-submenu">
            <li class="pc-item"><a class="pc-link" href="">Products</a></li>
            <li class="pc-item"><a class="pc-link" href="">Categories</a></li>
            <li class="pc-item"><a class="pc-link" href="#attributes">Attributes</a></li>
            <li class="pc-item"><a class="pc-link" href="#collections">Collections</a></li>
            <li class="pc-item"><a class="pc-link" href="#pricing">Pricing & Taxes</a></li>
            <li class="pc-item"><a class="pc-link" href="#media">Media</a></li>
          </ul>
        </li>
        <li class="pc-item pc-hasmenu">
          <a href="#!" class="pc-link">
            <span class="pc-micon"><i class="ti ti-trending-up"></i></span>
            <span class="pc-mtext">Sales</span>
            <span class="pc-arrow"><i data-feather="chevron-right"></i></span>
          </a>
          <ul class="pc-submenu">
            <li class="pc-item"><a class="pc-link" href="#sales">All Sales</a></li>
            <li class="pc-item"><a class="pc-link" href="#sales-channels">Sales Channels</a></li>
            <li class="pc-item"><a class="pc-link" href="#sales-summary">Sales Summary</a></li>
          </ul>
        </li>
        <li class="pc-item pc-hasmenu">
          <a href="#!" class="pc-link">
            <span class="pc-micon"><i class="ti ti-receipt"></i></span>
            <span class="pc-mtext">Orders</span>
            <span class="pc-arrow"><i data-feather="chevron-right"></i></span>
          </a>
          <ul class="pc-submenu">
            <li class="pc-item"><a class="pc-link" href="#orders">All Orders</a></li>
            <li class="pc-item"><a class="pc-link" href="#returns">Returns & Refunds</a></li>
            <li class="pc-item"><a class="pc-link" href="#shipping">Shipping & Fulfillment</a></li>
            <li class="pc-item"><a class="pc-link" href="#invoices">Invoices</a></li>
          </ul>
        </li>
        <li class="pc-item pc-hasmenu">
          <a href="#!" class="pc-link">
            <span class="pc-micon"><i class="ti ti-users"></i></span>
            <span class="pc-mtext">Customers</span>
            <span class="pc-arrow"><i data-feather="chevron-right"></i></span>
          </a>
          <ul class="pc-submenu">
            <li class="pc-item"><a class="pc-link" href="#customers">Customer List</a></li>
            <li class="pc-item"><a class="pc-link" href="#segments">Segments</a></li>
            <li class="pc-item"><a class="pc-link" href="#reviews">Reviews</a></li>
          </ul>
        </li>
        <li class="pc-item pc-hasmenu">
          <a href="#!" class="pc-link">
            <span class="pc-micon"><i class="ti ti-box"></i></span>
            <span class="pc-mtext">Inventory</span>
            <span class="pc-arrow"><i data-feather="chevron-right"></i></span>
          </a>
          <ul class="pc-submenu">
            <li class="pc-item"><a class="pc-link" href="#stock">Stock</a></li>
            <li class="pc-item"><a class="pc-link" href="#warehouses">Warehouses</a></li>
            <li class="pc-item"><a class="pc-link" href="#transfers">Transfers</a></li>
            <li class="pc-item"><a class="pc-link" href="#suppliers">Suppliers</a></li>
          </ul>
        </li>

                <li class="pc-item pc-caption">
                    <label>Growth</label>
                    <i class="ti ti-chart-line"></i>
                </li>
                <li class="pc-item pc-hasmenu">
                    <a href="#!" class="pc-link">
                        <span class="pc-micon"><i class="ti ti-speakerphone"></i></span>
                        <span class="pc-mtext">Marketing</span>
                        <span class="pc-arrow"><i data-feather="chevron-right"></i></span>
                    </a>
                    <ul class="pc-submenu">
                        <li class="pc-item"><a class="pc-link" href="#coupons">Coupons</a></li>
                        <li class="pc-item"><a class="pc-link" href="#discounts">Discounts</a></li>
                        <li class="pc-item"><a class="pc-link" href="#campaigns">Campaigns</a></li>
                        <li class="pc-item"><a class="pc-link" href="#email">Email & SMS</a></li>
                        <li class="pc-item"><a class="pc-link" href="#abandoned">Abandoned Carts</a></li>
                    </ul>
                </li>
                <li class="pc-item pc-hasmenu">
                    <a href="#!" class="pc-link">
                        <span class="pc-micon"><i class="ti ti-report-analytics"></i></span>
                        <span class="pc-mtext">Analytics</span>
                        <span class="pc-arrow"><i data-feather="chevron-right"></i></span>
                    </a>
                    <ul class="pc-submenu">
                        <li class="pc-item"><a class="pc-link" href="#analytics">Overview</a></li>
                        <li class="pc-item"><a class="pc-link" href="#reports">Reports</a></li>
                        <li class="pc-item"><a class="pc-link" href="#exports">Exports</a></li>
                    </ul>
                </li>

                <li class="pc-item pc-caption">
                    <label>Platform</label>
                    <i class="ti ti-plug-connected"></i>
                </li>
                <li class="pc-item pc-hasmenu">
                    <a href="#!" class="pc-link">
                        <span class="pc-micon"><i class="ti ti-plug"></i></span>
                        <span class="pc-mtext">Plugins & Apps</span>
                        <span class="pc-arrow"><i data-feather="chevron-right"></i></span>
                    </a>
                    <ul class="pc-submenu">
                        <li class="pc-item"><a class="pc-link" href="#plugins">Installed Plugins</a></li>
                        <li class="pc-item"><a class="pc-link" href="#marketplace">Marketplace</a></li>
                        <li class="pc-item"><a class="pc-link" href="#integrations">Integrations</a></li>
                        <li class="pc-item"><a class="pc-link" href="#webhooks">Webhooks</a></li>
                    </ul>
                </li>
                <li class="pc-item pc-hasmenu">
                    <a href="#!" class="pc-link">
                        <span class="pc-micon"><i class="ti ti-settings"></i></span>
                        <span class="pc-mtext">Settings</span>
                        <span class="pc-arrow"><i data-feather="chevron-right"></i></span>
                    </a>
                    <ul class="pc-submenu">
                        <li class="pc-item"><a class="pc-link" href="#store-settings">Store Settings</a></li>
                        <li class="pc-item"><a class="pc-link" href="#payments">Payments</a></li>
                        <li class="pc-item"><a class="pc-link" href="#taxes">Taxes</a></li>
                        <li class="pc-item"><a class="pc-link" href="#shipping-zones">Shipping Zones</a></li>
                            <li class="pc-item"><a class="pc-link" href="">Users</a></li>
                        <li class="pc-item"><a class="pc-link" href="#audit">Audit Logs</a></li>
                    </ul>
                </li>
                <li class="pc-item pc-hasmenu">
                    <a href="#!" class="pc-link">
                        <span class="pc-micon"><i class="ti ti-news"></i></span>
                        <span class="pc-mtext">Blog</span>
                        <span class="pc-arrow"><i data-feather="chevron-right"></i></span>
                    </a>
                    <ul class="pc-submenu">
                        <li class="pc-item"><a class="pc-link" href="#blog-posts">Posts</a></li>
                        <li class="pc-item"><a class="pc-link" href="#blog-categories">Categories</a></li>
                        <li class="pc-item"><a class="pc-link" href="#blog-comments">Comments</a></li>
                    </ul>
                </li>
                <li class="pc-item pc-hasmenu">
                    <a href="#!" class="pc-link">
                        <span class="pc-micon"><i class="ti ti-headset"></i></span>
                        <span class="pc-mtext">Support</span>
                        <span class="pc-arrow"><i data-feather="chevron-right"></i></span>
                    </a>
                    <ul class="pc-submenu">
                        <li class="pc-item"><a class="pc-link" href="#support-tickets">Tickets</a></li>
                        <li class="pc-item"><a class="pc-link" href="#support-faqs">FAQs</a></li>
                        <li class="pc-item"><a class="pc-link" href="#support-feedback">Feedback</a></li>
                    </ul>
                </li>

                <li class="pc-item pc-hasmenu">
                    <a href="#!" class="pc-link">
                        <span class="pc-micon"><i class="ti ti-wallet"></i></span>
                        <span class="pc-mtext">Payment Gateway</span>
                        <span class="pc-arrow"><i data-feather="chevron-right"></i></span>
                    </a>
                    <ul class="pc-submenu">
                        <li class="pc-item"><a class="pc-link" href="#gateway-config">Configuration</a></li>
                        <li class="pc-item"><a class="pc-link" href="#gateway-keys">API Keys</a></li>
                        <li class="pc-item"><a class="pc-link" href="#gateway-transactions">Transactions</a></li>
                    </ul>
                </li>

                <li class="pc-item pc-caption">
                    <label>Website Settings</label>
                    <i class="ti ti-globe"></i>
                </li>
                <li class="pc-item pc-hasmenu">
                    <a href="#!" class="pc-link">
                        <span class="pc-micon"><i class="ti ti-world"></i></span>
                        <span class="pc-mtext">Website Setup</span>
                        <span class="pc-arrow"><i data-feather="chevron-right"></i></span>
                    </a>
                    <ul class="pc-submenu">
                        <li class="pc-item"><a class="pc-link" href="#site-pages">Pages</a></li>
                        <li class="pc-item"><a class="pc-link" href="#site-menu">Menu</a></li>
                        <li class="pc-item"><a class="pc-link" href="#site-seo">SEO Settings</a></li>
                    </ul>
                </li>

        <li class="pc-item pc-caption">
          <label>Superadmin</label>
          <i class="ti ti-shield-lock"></i>
        </li>
        <li class="pc-item pc-hasmenu">
          <a href="#!" class="pc-link">
            <span class="pc-micon"><i class="ti ti-building-community"></i></span>
            <span class="pc-mtext">Tenants</span>
            <span class="pc-arrow"><i data-feather="chevron-right"></i></span>
          </a>
          <ul class="pc-submenu">
            <li class="pc-item"><a class="pc-link" href="">Tenant List</a></li>
            <li class="pc-item"><a class="pc-link" href="">Plans & Billing</a></li>
            <li class="pc-item"><a class="pc-link" href="#feature-flags">Feature Flags</a></li>
            <li class="pc-item"><a class="pc-link" href="#limits">Limits & Quotas</a></li>
          </ul>
        </li>
        <li class="pc-item pc-hasmenu">
          <a href="#!" class="pc-link">
            <span class="pc-micon"><i class="ti ti-shield-check"></i></span>
            <span class="pc-mtext">Roles & Permissions</span>
            <span class="pc-arrow"><i data-feather="chevron-right"></i></span>
          </a>
          <ul class="pc-submenu">
            <li class="pc-item"><a class="pc-link" href="">Roles</a></li>
            <li class="pc-item"><a class="pc-link" href="">Permissions</a></li>
          </ul>
        </li>
        <li class="pc-item pc-hasmenu">
          <a href="#!" class="pc-link">
            <span class="pc-micon"><i class="ti ti-world"></i></span>
            <span class="pc-mtext">Platform Ops</span>
            <span class="pc-arrow"><i data-feather="chevron-right"></i></span>
          </a>
          <ul class="pc-submenu">
            <li class="pc-item"><a class="pc-link" href="#api-keys">API Keys</a></li>
            <li class="pc-item"><a class="pc-link" href="#jobs">Jobs & Queue</a></li>
            <li class="pc-item"><a class="pc-link" href="#health">Health & Monitoring</a></li>
            <li class="pc-item"><a class="pc-link" href="#system-audit">System Audit</a></li>
          </ul>
        </li>
      
            </ul>
            <div class="w-100 text-center">
                <div class="badge theme-version badge rounded-pill bg-light text-dark f-12"></div>
            </div>
        </div>
    </div>
</nav>
</nav>
