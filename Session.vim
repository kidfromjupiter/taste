let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/taste
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +8 taste_backend/apps/custom_auth/authentication.py
badd +57 taste_backend/apps/cart/models.py
badd +69 taste-frontend/src/app/cart/page.tsx
badd +6 taste-frontend/src/components/FramerWrapper.tsx
argglobal
%argdel
edit taste-frontend/src/components/FramerWrapper.tsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 138 + 86) / 173)
exe '2resize ' . ((&lines * 25 + 20) / 41)
exe 'vert 2resize ' . ((&columns * 34 + 86) / 173)
exe '3resize ' . ((&lines * 12 + 20) / 41)
exe 'vert 3resize ' . ((&columns * 34 + 86) / 173)
argglobal
balt taste-frontend/src/app/cart/page.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 6 - ((5 * winheight(0) + 19) / 38)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 6
normal! 012|
wincmd w
argglobal
if bufexists(fnamemodify("term://~/taste//201092:/bin/bash", ":p")) | buffer term://~/taste//201092:/bin/bash | else | edit term://~/taste//201092:/bin/bash | endif
if &buftype ==# 'terminal'
  silent file term://~/taste//201092:/bin/bash
endif
balt taste-frontend/src/components/FramerWrapper.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 1 - ((0 * winheight(0) + 12) / 25)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 1
normal! 031|
wincmd w
argglobal
if bufexists(fnamemodify("term://~/taste//201094:/bin/bash", ":p")) | buffer term://~/taste//201094:/bin/bash | else | edit term://~/taste//201094:/bin/bash | endif
if &buftype ==# 'terminal'
  silent file term://~/taste//201094:/bin/bash
endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 1 - ((0 * winheight(0) + 6) / 12)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 1
normal! 029|
wincmd w
3wincmd w
exe 'vert 1resize ' . ((&columns * 138 + 86) / 173)
exe '2resize ' . ((&lines * 25 + 20) / 41)
exe 'vert 2resize ' . ((&columns * 34 + 86) / 173)
exe '3resize ' . ((&lines * 12 + 20) / 41)
exe 'vert 3resize ' . ((&columns * 34 + 86) / 173)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
