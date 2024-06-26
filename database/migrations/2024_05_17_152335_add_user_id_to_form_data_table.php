<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUserIdToFormDataTable extends Migration
{
    public function up()
    {
        Schema::table('form_data', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->after('id')->nullable(); // Allow null temporarily
        });
    }

    public function down()
    {
        Schema::table('form_data', function (Blueprint $table) {
            $table->dropColumn('user_id');
        });
    }
}


