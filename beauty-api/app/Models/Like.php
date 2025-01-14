<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    protected $table = 'likes';

    protected $fillable = [
        'id_usuario',
        'id_blog'
    ];
    public $timestamps = false;
    public function user()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }
}
