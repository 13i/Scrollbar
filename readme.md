# Mootools Scrollbar

An easily customizable scrollbar.

## Background

We needed custom scrollbars for several projects and couldn't find any that was 
really easy to use and compatible with Mootools 1.4.

We are realising this script as it could be useful for other developpers.

## Requirements

* Mootools 1.4
* Mootools-more Drag

## Get files

__Manual__

1. Download this: http://github.com/13i/scrollbar/zipball/master
2. Unzip that download.
3. Copy the resulting folder in `js` directory
4. Rename the folder you just copied to `scrollbar`

__GIT Submodule__

In your `js` directory type:

    git submodule add git://github.com/13i/scrollbar.git scrollbar
    git submodule init
    git submodule update

__GIT Clone__

In your `js` directory type:

    git clone git://github.com/13i/scrollbar.git scrollbar

## Installation

We assume you have already included `Mootools` &amp Mootools

In your `<HEAD>` :

    <link rel="stylesheet" type="text/css" href="JS_FOLDER/scrollbar/Source/scrollbar.css" />
    <script type="text/javascript" src="JS_FOLDER/scrollbar/Source/scrollbar.js"></script>
    <script type="text/javascript">
    window.addEvent('domready', function(){
        new Scrollbar('myScrollbar');
    });
    </script>
    
In your `<BODY>` :

    <div id="myScrollbar" style="height:200px; overflow-y: auto;">
        <p>Lorem...</p>
        <p>Lorem...</p>
        <p>Lorem...</p>
        <p>Lorem...</p>
        <p>Lorem...</p>
        <p>Lorem...</p>
        <p>Lorem...</p>
        <p>Lorem...</p>
        <p>Lorem...</p>
    </div>

## Usage

2. Include Mootools & Mootools/Drag in your page (if it's not already done)
1. Include `scrollbar.css` in your `<head>`
4. Include `scrollbar.js` in your `<head>`
5. Include `scrollbar.js` in your `<body>`

### 

[PARAGRAPH EXPLAINING DIFFERENT WAYS TO CONFIGURE THE PLUGIN]

## Options

* [ONE OPTION] : [OPTION EXPLANATION]
* [ANOTHER OPTION] : [OPTION EXPLANATION]
* [YET ANOTHER OPTION]
** [VALID PARAMETER]
** [ANOTHER VALID PARAMETER]

## Todo

* [TODO ITEM]
* [ANOTHER ITEM]
* -[COMPLETED ITEM]-

## License

Copyright (c) 2011 Treize Interactif (Pierre Aboucaya)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.