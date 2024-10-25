<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class FormData extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'form_data';

    use HasFactory;

    protected $fillable = [
        // Define the fillable attributes for mass assignment
        'user_id',
        'input1',
        'input1a',
        'input1b',
        'input1c',
        'input2',
        'input3',
        'input3a',
        'input4',
        'input4a',
        'input4b',
        'input6',
        'input6a',
        'input6b',
        'input8',
        'input8a',
        'input8b',
        'input8c',
        'input8d',
        'input8e',
        'input8f',
        'input9',
        // Add other fields as needed
    ];

    // Automatically generate a UUID for new records
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->uuid = (string) Str::uuid();
        });
    }

    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
