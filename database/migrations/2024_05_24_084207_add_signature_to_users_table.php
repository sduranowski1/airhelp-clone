<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSignatureToFormDataTable extends Migration
{
    public function up()
    {
        Schema::table('form_data', function (Blueprint $table) {
            $table->text('signature')->nullable(); // Add the signature column
        });
    }

    public function down()
    {
        Schema::table('form_data', function (Blueprint $table) {
            $table->dropColumn('signature');
        });
    }
}
