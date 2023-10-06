
$(document).ready(function(){
    $(".name, .student, .small-intro").lettering();
    
    // IMAGES OVERLAY EFFECT
    anime({
        targets: '.home .person-overlay',
        translateX: 1100,
        delay: 1000,
        duration: 1500,
        easing: 'easeOutSine'
    });

    anime({
        targets: '.home .person img',
        opacity: 1,
        delay: 1500,
        duration: 1500,
        easing: 'easeInSine'
    });

    anime({
        targets: '.student span',
        opacity: 1,
        duration: 1500,
        easing: 'easeInSine',
        delay: anime.stagger(100, {start: 3000})
    });

    anime({
        targets: '.name span',
        opacity: 1,
        duration: 3000,
        easing: 'easeInSine',
        delay: anime.stagger(100, {start: 4500})
    })
    //Logo
    anime({
        targets: '.logo',
        opacity: 1,
        duration: 3000,
        delay: 9500
    })
    //menu
    
    //Intro
    anime({
        targets: '.small-intro span',
        opacity: 1,
        duration: 1000,
        easing: 'easeInSine',
        delay: anime.stagger(50, {start: 11000})
    })
});

    

