# Tab Transposer
This tool was originally developed to make it easier for me to play songs by the Dropkick Murphys on mandolin. Many of these songs are played on mandolin and banjo but most of the tabs online are transposed for guitar. So I decided to make something that would transpose these songs back. I realized this algorithm can also be used to transpose tabs across tunings and capos, so I added those features in as well.

This tool is fairly limited in its current state. Input tabs containing double-digit frets are not supported - a "12" will be read as frets "1" and "2" and will be transposed as such. Additionally, errors may occur if you input two notes being played at the same time - if the algorithm determines that these two notes should be played on the same string, one of these notes will be lost.

Each line of input represents a single string. Be sure to remove any text above your tab and do not attempt to stack blocks of tab on top of each other - this will not work.

All source code can be found on my GitHub, linked above. Suggestions and merge requests will be taken seriously.

Feel free to email me at blackbret94@gmail.com.

## Compiling
Several build steps are used to create backwards compatible, and efficient, javascript.  This requires that you have NodeJS installed.

- Browserify is used to combine scripts into a single bundle.
- Babel is used to compile the JS into a form that can be used by older browsers.
- Uglify is used to minify the script, making it smaller to download.

```
# install packages
npm install 

# compile JS (once)
npm run build

# run watcher to compile JS
npm run watch
```