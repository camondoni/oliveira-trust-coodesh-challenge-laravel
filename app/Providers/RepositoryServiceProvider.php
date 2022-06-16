<?php

namespace App\Providers;

use App\Interfaces\CotationAPIInterface;
use App\Interfaces\CotationFeeInterface;
use App\Repositories\CotationAPIRepository;
use App\Repositories\CotationFeeRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bind(CotationFeeInterface::class, CotationFeeRepository::class);
        $this->app->bind(CotationAPIInterface::class, CotationAPIRepository::class);
    }
}
