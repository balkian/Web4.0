#!/bin/bash
for i in `npm bin`/hookio-*
do
	$i &
done
