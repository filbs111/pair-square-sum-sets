problem
-------

want to find sets of integer dimension rectangles that fit within same radius circle.
ie where width^2 + length^2 = diameter^2

motivation
----------

want to find nested duocylinder dimensions for 3-sphere game project.

also an example to test performance of wasm vs javascript.

notes
-----

some sets of numbers can be found by looking at pythagorean triples ie
a^2 + b^2 = c^2,

but actually, c is not required to be an integer. c^2 is an integer (since a, b are integers)

some notes on pythagorean triples predating this realisation - see "pythag-triples-duocylinder-notes.txt"


instructions
------------

to build, run c version, example

gcc -Os -c main.c && gcc main.o -o out-os.exe && ./out-os.exe

outputs:
int max: 2147483647
number: 160225 (12) :   (15,400),       (32,399),       (76,393),       (81,392),       (113,384),      (140,375),      (175,360),      (183,356),      (216,337),      (228,329),      (252,311),      (265,300),
number: 204425 (12) :   (11,452),       (32,451),       (61,448),       (80,445),       (116,437),      (157,424),      (184,413),      (203,404),      (220,395),      (245,380),      (280,355),      (308,331),
number: 226525 (12) :   (30,475),       (43,474),       (75,470),       (146,453),      (155,450),      (174,443),      (222,421),      (250,405),      (261,398),      (267,394),      (309,362),      (331,342),
number printed: 3
time taken: 3
time taken: 0
clocks per sec: 1000
time taken: 3

browser wasm versions built using emscripten emcc. 

performance:
------------

for 500 maximum, print 12 or more. execution times in ms. cc=console closed

|version								|firefox |brave    |firefox cc|brave cc|notes|
|---------------------------------------|--------|---------|----------|--------|----|
|wasm									|	50	 |	   16  ||||
|wasm -O1								|	12	 |	    9  ||||
|wasm -O2								|	13	 |	   10  ||||
|wasm -O3								|	12	 |		8  ||||
|wasm -Oz								|	16	 |		8  |	5	|	5||
|wasm -Oz unsigned int					|	14	 |		8  |	4	|	5|suspect unsigned int observed speedup maybe just measurement uncertainty. also  removed code setting initial array values.|
|no wasm (WASM=0, so should be asm.js)	|	40		|	86|||
|no wasm -O0							|		43	|	85|||
|no wasm -O1							|		28	|	39||		37||
|no wasm -O2							|		36	|	39|			12|||
|no wasm -Oz							|		38	|	|			12	|		37||
|no wasm -Oz	unsigned int			|		28	|	31	|		13	|		29||
|old javascript version					|	146		|	123		|	137		|	149||
|backported from c javascript new version |	21		|	29		|	25		|	20||
|backported from c + typedarray	(uint32)|	9		|	12		|	7		|	13||

|version|execution time (ms)|command|
|-------|-------------------|-------|
|gcc executable		|	5	|	$ gcc -c main.c && gcc main.o -o out.exe && ./out.exe |
|gcc executable w/ -O1|	3	|   $ gcc -O1 -c main.c && gcc main.o -o out-o1.exe && ./out-o1.exe|
|gcc executable w/ -O2	|3 | $ gcc -O2 -c main.c && gcc main.o -o out-o2.exe && ./out-o2.exe|

 result - old javascript version very slow, not a good comparison
 new javascript version is ported from c version, and typed arrays used, for reasonable comparison

 native c is fastest. 

 wasm browser version is fast, but much more so when console closed! -O1 optimisation helps. above this doesn't impact run time much , but files are smaller.
 asm.js version is quite fast for firefox, but slower than optimised js version on both brave (even when js version uses regular arrays) and firefox.
 
both emscripten versions are inferior to js version in being unable to run for very large arrays. (out of memory).
 
note browser versions faster if console closed. 5ms, almost fast as native! TODO test without logs? with different logs (combo console.log calls?)

in short:
 asm.js counterproductive vs good regular js
 wasm with optimisation enabled is faster than good js (w/typedarrays) in both firefox (~4ms vs 7ms), and brave (~5ms vs 13ms)
 some issues with running out of memory to investigate
	 TODO take advice from compiler output and add some flags...

TODO
 binaryen instead of emscripten? writing js to complement wasm? (eg custom writing out objects returned?)
 abacus style output (dist along is angle = atanfull(x,y))
