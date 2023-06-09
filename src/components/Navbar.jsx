import Link from 'next/link'
import ThemeSwitcher from './ThemeSwitcher'
import { Cart } from './Cart'
import { User } from './User'
import { MobileMenu } from './MobileMenu'
import { Icon } from '@chakra-ui/react'

import useSound from 'use-sound'

export default function NavBar(props) {
    const LogoIcon = (props) => (
        <Icon viewBox='0 0 1138.000000 1280.000000' fill='none' {...props}>
            <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="#16a34a" stroke="none">
            <path d="M4712 12790 c-379 -48 -743 -236 -1024 -527 -268 -279 -416 -596
            -447 -956 -37 -433 13 -770 154 -1047 123 -239 347 -456 672 -650 435 -260
            920 -454 1803 -724 553 -168 803 -257 993 -352 283 -142 449 -306 524 -519 28
            -79 28 -84 28 -300 -2 -631 -165 -1082 -520 -1440 -199 -199 -429 -348 -692
            -445 l-93 -34 0 -323 0 -323 31 0 c51 0 268 47 395 86 316 95 637 266 904 480
            110 88 317 296 404 404 299 377 479 782 547 1235 27 177 29 469 5 620 -104
            657 -534 1085 -1356 1350 -237 76 -471 128 -970 215 -269 47 -354 65 -570 121
            -1099 283 -1640 795 -1641 1553 0 558 309 1005 763 1101 96 21 314 21 433 0
            260 -46 451 -152 609 -338 85 -102 161 -263 181 -382 8 -50 -8 -73 -105 -150
            -151 -120 -180 -170 -188 -310 -7 -146 39 -304 133 -451 82 -128 274 -383 343
            -456 84 -88 142 -121 209 -120 125 3 223 135 296 402 14 52 49 178 77 280 84
            304 87 394 22 534 -41 88 -84 132 -173 176 -46 24 -88 53 -103 73 -14 18 -46
            93 -72 167 -77 223 -143 358 -248 504 -203 282 -479 459 -823 526 -124 24
            -384 34 -501 20z"/>
            <path d="M0 8237 c0 -45 59 -145 115 -194 152 -135 367 -219 625 -243 371 -34
            708 -133 1069 -315 248 -124 433 -245 750 -493 506 -395 751 -560 1081 -726
            402 -203 808 -329 1265 -395 126 -18 218 -27 458 -47 l77 -6 0 -1003 0 -1003
            75 -11 c81 -12 342 -15 394 -5 l31 6 0 1058 0 1058 53 12 c165 39 388 138 524
            232 233 161 386 343 523 623 142 288 210 598 210 953 0 146 -12 218 -51 295
            -32 64 -96 143 -152 187 l-50 40 -3498 0 -3499 0 0 -23z"/>
            <path d="M8518 8254 c-4 -3 -2 -20 3 -37 5 -18 19 -81 31 -142 19 -96 22 -143
            23 -375 0 -209 -4 -289 -18 -378 -33 -206 -98 -440 -168 -604 -15 -38 -25 -68
            -22 -68 9 0 130 91 396 297 387 301 549 409 808 538 361 182 698 281 1069 315
            258 24 473 108 625 243 56 49 115 149 115 194 l0 23 -1428 0 c-786 0 -1431 -3
            -1434 -6z"/>
            <path d="M5148 5744 c-496 -89 -953 -474 -1117 -938 -64 -180 -74 -361 -35
            -606 70 -444 371 -766 914 -979 299 -118 573 -171 875 -171 708 0 1457 338
            1767 799 112 165 153 302 146 481 -10 229 -98 390 -269 495 -63 39 -226 96
            -339 119 -242 49 -498 23 -942 -95 l-38 -10 0 -230 c0 -186 3 -230 13 -226 54
            21 198 41 292 41 137 1 195 -14 246 -65 48 -48 64 -101 64 -214 -1 -100 -23
            -163 -84 -240 -97 -120 -307 -217 -571 -262 -120 -21 -489 -24 -600 -5 -272
            47 -454 126 -585 257 -129 128 -169 259 -147 482 21 215 74 353 178 463 74 78
            152 126 268 166 l86 29 0 362 0 363 -22 -1 c-13 0 -57 -7 -100 -15z"/>
            <path d="M5154 4442 c-56 -37 -137 -96 -179 -131 l-77 -63 6 -46 c9 -68 43
            -130 105 -193 85 -85 92 -87 143 -41 24 21 60 50 81 65 l37 28 0 225 c0 123
            -3 224 -7 224 -5 -1 -54 -31 -109 -68z"/>
            <path d="M4361 3247 c-26 -130 -35 -247 -35 -432 0 -188 2 -205 27 -288 113
            -368 424 -634 932 -796 252 -81 447 -110 1280 -191 286 -28 315 -33 371 -59
            34 -16 79 -44 100 -64 72 -64 114 -87 160 -87 33 0 46 5 58 22 21 30 20 56 -6
            125 -52 141 -262 281 -533 356 -173 48 -261 63 -805 138 -304 41 -485 104
            -639 224 -218 168 -331 403 -369 768 l-7 69 -87 33 c-118 46 -256 116 -355
            180 l-82 54 -10 -52z"/>
            <path d="M5440 2598 l0 -325 80 -37 c95 -43 336 -105 413 -106 4 0 7 176 7
            390 l0 390 -212 0 c-117 0 -230 3 -250 6 l-38 7 0 -325z"/>
            <path d="M5438 1223 c-4 -317 -5 -325 -69 -398 -88 -100 -239 -161 -559 -225
            -216 -44 -339 -76 -450 -117 -97 -36 -217 -100 -240 -127 -33 -41 -197 -69
            -575 -101 -260 -22 -377 -50 -528 -128 -81 -41 -137 -88 -137 -113 0 -12 386
            -14 2810 -14 2424 0 2810 2 2810 14 0 40 -146 131 -280 175 -118 38 -192 50
            -435 71 -389 34 -469 50 -541 108 -114 91 -312 159 -674 232 -320 64 -471 125
            -559 225 -63 72 -65 84 -69 363 -3 205 -6 252 -18 252 -33 0 -327 41 -392 55
            -40 8 -77 15 -82 15 -5 0 -10 -129 -12 -287z"/>
            </g>
        </Icon>
    )

    const [playSound] = useSound(
        '/sounds/sine-click.mp3',
        { volume: 0.5 }
    )

    return (
        <header className='sticky top-0 h-12 z-10 flex flex-row items-center justify-center bg-zinc-200/90 dark:bg-zinc-900/90 py-3 px-5 lg:px-10 backdrop-blur-xl transition-color duration-300 backdrop-saturate-150'>
            <Link onClick={() => playSound()} href='/' className='opacity-100 text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 ease-in duration-150
                            flex items-center absolute top-[50%] left-5 lg:left-10 translate-y-[-50%]'>
                <LogoIcon w={7} h={7}/>
                <span className='ml-2 hover:opacity-70 duration-150 ease'>
                    ePharmasy
                </span>
            </Link>
            <ul className='hidden md:flex flex-row px-6'>
                <li className='mr-4'>
                    <Link onClick={() => playSound()} href='/' className='text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 ease-in duration-150'>
                        Home
                    </Link>
                </li>
                <li className='mr-4'>
                    <Link onClick={() => playSound()} href='/cart' className='text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 ease-in duration-150'>
                        Cart
                    </Link>
                </li>
                <li className='mr-4'>
                    <Link onClick={() => playSound()} href='/faq' className='text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 ease-in duration-150'>
                        FAQ
                    </Link>
                </li>
            </ul>
            <ul className='hidden md:flex items-center absolute top-[50%] right-5 lg:right-10 translate-y-[-50%]'>
                <li className='flex items-center justify-center w-6 h-6 mr-3'>
                    <User />
                </li>
                <li className='flex items-center justify-center w-6 h-6 mr-3'>
                    <Cart />
                </li>
                <li className='flex items-center justify-center w-6 h-6'>
                    <ThemeSwitcher />
                </li>
            </ul>
            <MobileMenu />
        </header>
    )
}