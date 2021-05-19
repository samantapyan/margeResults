<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class margeUserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'margeTime' => $this-> margeTime,
            'name' => $this->name,
            'test' => '500',
            'id' => $this->id,
            'marge' => $this-> marge,

        ];

    }
}
