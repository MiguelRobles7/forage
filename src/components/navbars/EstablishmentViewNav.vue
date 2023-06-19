<template>
    <nav class="fixed top-0 bg-black text-white w-screen px-14 py-7">
        <div class="flex items-center">
            <div class="text-3xl font-bold font-Rowdies">
                Forage
            </div>
            <div class="flex flex-grow justify-end">
                <!--No Form Yet-->
                <img src="../../assets/search.png" class="relative top-[6px] left-7 w-[17px] h-[17px]">
                <input type="text" class="mr-5 font-SpaceGrotesk text-sm rounded-md text-black pl-10 w-[300px] placeholder:text-black" placeholder="Search...">
                <a href="" class="font-SpaceGrotesk mr-5 text-xl font-semibold underline underline-offset-2">
                    Home
                </a>
                <button class="mr-5 font-SpaceGrotesk text-lg bg-gradient-to-r from-[#5DDB8F] to-[#35C56F] rounded-s rounded-e px-5 font-semibold border-solid border-black border-[1px]">
                    Sign Up
                </button>
                <button class="text-lg font-SpaceGrotesk bg-gradient-to-r from-[#5DDB8F] to-[#35C56F] rounded-s rounded-e px-5 font-semibold border-solid border-black border-[1px]">
                    Log In
                </button>
            </div>
        </div>
    </nav>
</template>