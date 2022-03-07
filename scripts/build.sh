#!/bin/sh

node tiddlywiki/tiddlywiki.js gigecon --build index

cp -r gigecon/output/* ./