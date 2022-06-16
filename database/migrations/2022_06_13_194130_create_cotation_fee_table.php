<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cotation_fee', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->double('credit_card_fee', 3, 2);
            $table->double('boleto_fee', 3, 2);
            $table->double('min_value_fee', 3, 2);
            $table->double('max_value_fee', 3, 2);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cotation_fee');
    }
};
