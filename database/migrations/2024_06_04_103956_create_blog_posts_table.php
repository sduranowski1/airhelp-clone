<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->string('title');
            $table->text('content');

            // Optional: Additional columns
            // - author_id (foreign key referencing users table)
            // - excerpt (short summary of the content)
            // - category_id (foreign key referencing categories table)
            // - featured_image (path or URL to an image)
            // - slug (unique identifier for SEO-friendly URLs)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
    }
};
