/*
  NOTE:: $ is a custom function which can only be used as an element, a class, or an ID selector and should not be mistaken as JQuery $ function.
*/

window.onload = () => {

    const navTab = $( ".nav__tab" ),
        dropdownList = $( ".dropdown__list" ),
        filterComponentButton = $( "#filter__comp__button" ),
        toggleMobileHeaderNavBtns = $( ".mobile__nav__toggle__btn" ),
        departmentBannerCarousel = $( "#department__banner__carousel" ),
        modalTriggerAction = $( ".jsModalTrigger" ),
        initExploreYoutubeModal = $( "#init__explore__youtube__modal" ),
        homeMainPost = $( ".main-post" ),
        pageBanner = $( ".page__banner" ),
        pageBannerSlider = $( '#page__banner__slider' ),
        counterElements = $( '.counter__element' ),
        directoryFilteringInitials = $( '#directory__filter__initials' );


    if ( $( ".show_on__ready" ) ) {
        const showOnReadyElements = $( ".show_on__ready" );
        for ( let i = 0; i < showOnReadyElements.length; i++ ) {
            const element = showOnReadyElements[ i ];
            showElement( element );
        }
    }
    if ( navTab ) handleTab();
    if ( homeMainPost.length > 0 ) homeCarouselSlider();
    if ( pageBanner.length > 0 ) handlePageBannerBackground();
    if ( dropdownList ) handleDropDownMenuOnMobile();
    if ( filterComponentButton ) handleListFiltering();
    if ( toggleMobileHeaderNavBtns ) toggleMobileHeaderNavbar();
    if ( departmentBannerCarousel ) initDepartmentIntervalCarousel();
    if ( modalTriggerAction ) initModal();
    if ( initExploreYoutubeModal ) handleExploreYoutubeIframe();
    if ( $( ".school__radio__button" ) ) schoolRadio();
    if ( pageBannerSlider ) initPageBannerSlider();
    if ( counterElements.length > 0 ) initNumberCounter();
    if ( directoryFilteringInitials ) handleDirectoryFilter();



    function initNumberCounter () {
        const items = $( '.counter__element' );
        items.forEach( item => {
            const lastVal = Number( item.dataset.to ) || 0,
                duration = Number( item.dataset.duration ) || 5000,
                initVal = Number( item.dataset.start ) || 0;

            animatedCounter( item, initVal, lastVal, duration )
        } );
    }

    function animatedCounter ( obj, initVal, lastVal, duration ) {

        let startTime = null;

        let currentTime = Date.now();
        const step = ( currentTime ) => {
            if ( !startTime ) {
                startTime = currentTime;
            }

            const progress = Math.min( ( currentTime - startTime ) / duration, 1 );


            obj.children[ 0 ].innerHTML = numberWithCommas( Math.floor( progress * ( lastVal - initVal ) + initVal ) );

            if ( progress < 1 ) {
                window.requestAnimationFrame( step );
            } else {
                window.cancelAnimationFrame( window.requestAnimationFrame( step ) );
            }
        };

        //start animating
        window.requestAnimationFrame( step );
    }

    function initPageBannerSlider () {
        const navControl = $( '#page__banner__slider__dots' );
        const commonSliderOptions = {
            slideBy: 1,
            mouseDrag: true,
            "speed": 400,
            autoplayButtonOutput: false,
            "swipeAngle": false,
            autoplay: true,
            "navContainer": navControl ? "#page__banner__slider__dots" : null,
            "navAsThumbnails": navControl ? true : false,
        },
            sliderItemBg = document.querySelectorAll( '.slider__item__bg' );

        if ( sliderItemBg.length > 0 ) {
            sliderItemBg.forEach( item => {
                const bgImg = item.dataset.image;
                if ( bgImg )
                    item.style.backgroundImage = `url(${bgImg})`;
            } );
        }
        var page__slider = tns( {
            container: '#page__banner__slider',
            controls: false,
            items: 1,
            ...commonSliderOptions
        } );
    }

    function homeCarouselSlider () {
        let mainPosts = document.querySelectorAll( ".main-post" ),
            i = 0,
            postIndex = 0,
            currentMainPost = mainPosts[ postIndex ];

        let progressInterval = setInterval( progress, 50 ); // 180

        function progress () {
            if ( i === 100 ) {
                i = -5;
                postIndex++;

                addClass( currentMainPost, "main-post--not-active" );
                removeClass( currentMainPost, "main-post--active" );

                // reset postIndex to loop over the slides again
                if ( postIndex === mainPosts.length ) {
                    postIndex = 0;
                }
                currentMainPost = mainPosts[ postIndex ];
            } else {
                i++;

                addClass( currentMainPost, "main-post--active" );
                removeClass( currentMainPost, "main-post--not-active" );
            }
        }
    }

    function handlePageBannerBackground () {
        const banner = pageBanner[ 0 ],
            bgIMG =
                banner.dataset && banner.dataset.image ?
                    banner.dataset.image :
                    null,
            bannerGradient =
                "linear-gradient(2.56deg, rgba(4, 67, 54, 0.7) 50.75%, rgba(17, 86, 72, 0) 98.03%)";
        if ( bgIMG ) {
            banner.style.backgroundImage = `${bannerGradient},url(${bgIMG})`;
        }
    }

    function schoolRadio () {
        let radioIsPlaying = false;
        const radioButtons = document.querySelectorAll( ".school__radio__button" ),
            schoolRadioLink = document.querySelector( "#school__radio__link" );

        radioButtons.forEach( ( button ) => {
            button.addEventListener( "click", function ( event ) {
                event.preventDefault();
                toggleClass( button, "active" );

                if ( radioIsPlaying ) {
                    schoolRadioLink.pause();
                    radioIsPlaying = false;
                } else {
                    schoolRadioLink.play();
                    radioIsPlaying = true;
                }
            } );
        } );
    }

    function handleExploreYoutubeIframe () {
        const exploreYoutubeIframe = $( "#explore__youtube__iframe" );

        initExploreYoutubeModal.addEventListener( "click", () => {
            exploreYoutubeIframe.setAttribute(
                "src",
                exploreYoutubeIframe.dataset.src
            );
        } );

        const close = $( ".close__explore__youtube__modal" );
        for ( let i = 0; i < close.length; i++ ) {
            const btn = close[ i ];
            btn.addEventListener( "click", () => {
                resetIframe();
            } );
        }

        function resetIframe () {
            exploreYoutubeIframe.setAttribute(
                "src",
                exploreYoutubeIframe.dataset.src
            );
        }
    }

    function initModal () {
        readyForModal( openModal );
        readyForModal( onLoadModal );
        readyForModal( closeModal );
    }
    /* Opening modal window function */
    function openModal () {
        /* Get trigger element */
        var modalTrigger = document.querySelectorAll( ".jsModalTrigger" );

        /* Set onclick event handler for all trigger elements */
        for ( var i = 0; i < modalTrigger.length; i++ ) {
            modalTrigger[ i ].onclick = function () {
                var target = "";
                if ( this.getAttribute( "href" ) ) {
                    target = this.getAttribute( "href" ).substr( 1 );
                } else {
                    target = this.getAttribute( "target" );
                }
                var modalWindow = document.getElementById( target );

                modalWindow.classList ?
                    modalWindow.classList.add( "open" ) :
                    ( modalWindow.className += " " + "open" );
            };
        }
    }
    function onLoadModal () {
        var modalTrigger = document.querySelectorAll( ".onLoadModal" );
        for ( var i = 0; i < modalTrigger.length; i++ ) {
            var modalWindow = modalTrigger[ i ];
            modalWindow.classList ?
                modalWindow.classList.add( "open" ) :
                ( modalWindow.className += " " + "open" );

        }
    }

    function closeModal () {
        /* Get close button */
        var closeButton = document.querySelectorAll( ".jsModalClose" );
        var closeOverlay = document.querySelectorAll( ".jsOverlay" );

        /* Set onclick event handler for close buttons */
        for ( var i = 0; i < closeButton.length; i++ ) {
            closeButton[ i ].onclick = function () {
                var modalWindow = this.parentNode.parentNode;

                modalWindow.classList ?
                    modalWindow.classList.remove( "open" ) :
                    ( modalWindow.className = modalWindow.className.replace(
                        new RegExp(
                            "(^|\\b)" + "open".split( " " ).join( "|" ) + "(\\b|$)",
                            "gi"
                        ),
                        " "
                    ) );
            };
        }

        /* Set onclick event handler for modal overlay */
        for ( var i = 0; i < closeOverlay.length; i++ ) {
            closeOverlay[ i ].onclick = function () {
                var modalWindow = this.parentNode;

                modalWindow.classList ?
                    modalWindow.classList.remove( "open" ) :
                    ( modalWindow.className = modalWindow.className.replace(
                        new RegExp(
                            "(^|\\b)" + "open".split( " " ).join( "|" ) + "(\\b|$)",
                            "gi"
                        ),
                        " "
                    ) );
            };
        }
    }

    /* Handling domready event IE9+ */
    function readyForModal ( fn ) {
        if ( document.readyState != "loading" ) {
            fn();
        } else {
            document.addEventListener( "DOMContentLoaded", fn );
        }
    }

    function toggleMobileHeaderNavbar () {
        for ( let k = 0; k < toggleMobileHeaderNavBtns.length; k++ ) {
            const btn = toggleMobileHeaderNavBtns[ k ];
            btn.addEventListener( "click", ( e ) => {
                const sideDrawers = $( ".header__side__drawer" );
                for ( let i = 0; i < sideDrawers.length; i++ ) {
                    const sideDrawer = sideDrawers[ i ];
                    toggleClass( sideDrawer, "header__side__drawer--open" );
                }
            } );
        }
    }

    function handleDropDownMenuOnMobile () {
        if ( checkDevice().device !== 'Smartphones' ) return;

        for ( let k = 0; k < dropdownList.length; k++ ) {
            const dropdown = dropdownList[ k ];

            dropdown.addEventListener( "click", () => {
                if ( dropdown.classList.contains( "dropdown__list--mega" ) ) {
                    toggleClass( dropdown, "dropdown__list--mega--open" );
                } else {
                    toggleClass( dropdown, "dropdown__list--open" );
                }
            } );
        }
    }

    function initDepartmentIntervalCarousel ( delay = 2000 ) {
        const departmentBannerCarousel = $( "#department__banner__carousel" ),
            slideGradientOverlay =
                "linear-gradient(180deg, rgba(196, 196, 196, 0) 5.21%, rgba(15, 15, 15, 0.84) 99.99%, rgba(15, 15, 15, 0.84) 100%)";
        let currentIndex = 0;

        const initFirstSlide = () => {
            const firstSlide = $(
                ".department__banner__carousel__item--active"
            )[ 0 ],
                bgIMG = firstSlide.dataset.image;
            firstSlide.style.backgroundImage = `${slideGradientOverlay},url(${bgIMG})`;
        },
            getNewIndexFunc = () => {
                if ( currentIndex < departmentBannerCarousel.children.length - 1 ) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                return currentIndex;
            },
            callback = () => {
                const newIndex = getNewIndexFunc();

                removeClass(
                    $( ".department__banner__carousel__item--active" )[ 0 ],
                    "department__banner__carousel__item--active"
                );
                const nextSlide = departmentBannerCarousel.children[ newIndex ],
                    bgIMG = nextSlide.dataset.image;

                nextSlide.style.backgroundImage = `${slideGradientOverlay},url(${bgIMG})`;
                addClass( nextSlide, "department__banner__carousel__item--active" );
            };

        initFirstSlide();
        return setInterval( callback, delay );
    }

    function handleListFiltering () {
        filterComponentButton.addEventListener( "click", toggleFilterDropDown );

        const filterItems = $( ".filter__comp__list__item" );

        filterItems.forEach( ( item ) => {
            item.addEventListener( "click", selectFilterItem );
        } );
    }

    function selectFilterItem ( e ) {
        if ( e.target.dataset.filterRef ) {
            const filterRef = e.target.dataset.filterRef,
                textContent = e.target.innerText;
            filterList( filterRef, textContent );
        } else if ( e.target.dataset.resetFilter ) {
            resetListFilter( e.target.dataset.filterTitle );
        }

        filterComponentButton.click(); // close filter dropdown
    }

    function filterList ( filterRef, textContent ) {
        const filterTargetContainer = $( "#filter__comp__target" );
        if ( !filterTargetContainer ) return;

        filterComponentButton.innerText = textContent;

        for ( let i = 0; i < filterTargetContainer.children.length; i++ ) {
            const target = filterTargetContainer.children[ i ];
            if ( target.dataset.filterRef ) {
                if ( target.dataset.filterRef === filterRef ) {
                    showElement( target );
                } else {
                    hideElement( target );
                }
            }
        }
    }

    function resetListFilter ( filterTitle ) {
        const filterTargetContainer = $( "#filter__comp__target" );
        if ( !filterTargetContainer ) return;

        filterComponentButton.innerText = filterTitle;
        for ( let i = 0; i < filterTargetContainer.children.length; i++ ) {
            const target = filterTargetContainer.children[ i ];
            showElement( target );
        }
    }

    function toggleFilterDropDown ( e ) {
        const dropDownList = $( "#filter__comp__list" );
        toggleClass( dropDownList, "filter__comp__list--active" );
    }

    function handleTab ( n = navTab ) {
        if ( void 0 === n.forEach ) {
            // ID SELECTOR
            for ( const e of n.children )
                e.addEventListener( "click", function ( k ) {
                    k.preventDefault();
                    let a = "";
                    for ( let e = 0; e < n.children.length; e++ )
                        if (
                            n.children[ e ].classList.contains(
                                "nav__tab__item--active"
                            )
                        ) {
                            a = n.children[ e ];
                            break;
                        }
                    removeClass( a, "nav__tab__item--active" ),
                        addClass( e, "nav__tab__item--active" ),
                        switchTab( e );
                } );
        } else
            n.forEach( ( e ) => {
                // CLASS SELECTOR
                for ( const n of e.children )
                    n.addEventListener( "click", function ( k ) {
                        k.preventDefault();
                        let a = "";
                        for ( let i = 0; i < e.children.length; i++ )
                            if (
                                e.children[ i ].classList.contains(
                                    "nav__tab__item--active"
                                )
                            ) {
                                a = e.children[ i ];
                                break;
                            }
                        removeClass( a, "nav__tab__item--active" ),
                            addClass( n, "nav__tab__item--active" ),
                            switchTab( n );
                    } );
            } );
    }

    function switchTab ( e ) {
        if ( e.hasAttribute( "target" ) ) {
            let a = "",
                i = $( "#" + e.parentNode.getAttribute( "tab-ref" ) );
            for ( let e = 0; e < i.children.length; e++ )
                if ( i.children[ e ].classList.contains( "nav__tab__target--active" ) ) {
                    a = i.children[ e ];
                    break;
                }
            var n = $( "#" + e.getAttribute( "target" ) );
            hideElement( a ),
                showElement( n ),
                removeClass( a, "nav__tab__target--active" ),
                addClass( n, "nav__tab__target--active" );
        }
    }

    function $ ( e ) {
        if ( null !== e )
            return "#" === e[ 0 ] ?
                document.querySelector( e ) :
                "." === e[ 0 ] ?
                    document.querySelectorAll( e ) :
                    document.getElementsByTagName( e );
    }

    function hideElement ( e ) {
        e.style.display = "none";
    }

    function showElement ( e ) {
        e.style.display = "block";
    }

    function addClass ( e, ...t ) {
        t.forEach( ( t ) => {
            e.classList.add( t );
        } );
    }

    function removeClass ( e, ...t ) {
        t.forEach( ( t ) => {
            e.classList.remove( t );
        } );
    }

    function toggleClass ( e, ...t ) {
        t.forEach( ( t ) => {
            e.classList.toggle( t );
        } );
    }

    function checkDevice () {
        let e = void 0;
        return (
            document.body.clientWidth >= 320 && document.body.clientWidth <= 480 ?
                ( e = "Smartphones" ) :
                document.body.clientWidth >= 768 &&
                    document.body.clientWidth <= 1024 &&
                    document.body.clientHeight >= 768 ?
                    ( e = "iPads" ) :
                    document.body.clientWidth >= 321 && 0 != screen.orientation.angle ?
                        ( e = "Smartphones landscape" ) :
                        document.body.clientWidth <= 320 ?
                            ( e = "Smartphones portrait" ) :
                            document.body.clientWidth >= 1224 && ( e = "Desktops" ), { device: e, ...getDeviceInfo() }
        );
    }

    function getDeviceInfo () {
        return {
            bodyHeight: document.body.clientHeight,
            bodyWidth: document.body.clientWidth,
            screenHeight: screen.height,
            screenWidth: screen.width,
            screenAvailHeight: screen.availHeight,
            screenAvailWidth: screen.availWidth
        };
    }

    function numberWithCommas ( e ) {
        return e.toString().replace( /\B(?=(\d{3})+(?!\d))/g, "," );
    }

    function handleDirectoryFilter () {
        toggleDirectorySearchAreaOnMobile();
        handleInititalFiltering();
        handleDirectorySearch();
    }

    function handleInititalFiltering () {
        const directoryFilteringInitials = $( '#directory__filter__initials' );

        for ( let i = 0; i < directoryFilteringInitials.children.length; i++ ) {
            const initial = directoryFilteringInitials.children[ i ];

            initial.addEventListener( 'click', () => {
                const filterTextContent = initial.textContent;

                removeClass( $( '.directory__filter__initial--active' )[ 0 ], 'directory__filter__initial--active' );

                addClass( initial, 'directory__filter__initial--active' );


                let thereIsResult = false;
                $( '.directory__search__title' ).forEach( title => {
                    const initial = title.textContent.toString()[ 0 ],
                        parentItem = title.parentElement.parentElement;
                    if ( initial !== filterTextContent ) {
                        removeClass( parentItem, 'directory__grid__item--show' )
                    } else {
                        thereIsResult = true;
                        addClass( parentItem, 'directory__grid__item--show' )
                    }
                } );
                if ( thereIsResult ) {
                    $( '.directory__grid' )[ 0 ].scrollIntoView();
                    hideElement( $( '#no_filter__result' ) )
                } else {
                    showElement( $( '#no_filter__result' ) );
                    $( '#no_filter__result' ).scrollIntoView();
                }
            } );
        }
    }

    function toggleDirectorySearchAreaOnMobile () {

        $( '#directory__init__search__button' ).addEventListener( 'click', () => {
            toggleClass( $( '#directory__search__area' ),
                'open' )
        } );

        $( '#directory__close__button' ).addEventListener( 'click', () => {
            toggleClass( $( '#directory__search__area' ),
                'open' )
        } );
    }

    function handleDirectorySearch () {
        const directorySearchForm = $( '#directory__search__form' ),
            fullnameSearchBox = $( '#fullname__search__box' ),
            departmentSearchBox = $( '#department__search__box' );


        /* NOTE::  To be reviewed later 
    
        // handles when the input is cleared
        fullnameSearchBox.addEventListener('keyup', (e) => {
            if (e.target.value.length <= 1) {
                applySearchFilter();
            }
        });
        // handles when the input is cleared
        departmentSearchBox.addEventListener('keyup', (e) => {
            if (e.target.value.length <= 1) {
                applySearchFilter();
            }
        });

        */

        // handles when the form is submitted
        directorySearchForm.addEventListener( 'submit', ( e ) => {
            e.preventDefault();

            applySearchFilter();

            // close overlay on mobile 
            if ( $( '#directory__search__area' ).classList.contains( 'open' ) )
                removeClass( $( '#directory__search__area' ),
                    'open' )
        } );

        function applySearchFilter () {

            const fullnameFilter = fullnameSearchBox.value.toString().toLowerCase(),
                departmentFilter = departmentSearchBox.value.toString().toLowerCase();
            let thereIsResult = false;


            $( '.directory__grid__item' ).forEach( gridItem => {
                const title = gridItem.querySelector( '.directory__search__title' ).textContent.toString().toLowerCase(),
                    department = gridItem.querySelector( '.directory__search__department' ).textContent.toString().toLowerCase();

                if ( title.includes( fullnameFilter ) && department.includes( departmentFilter ) ) {
                    thereIsResult = true;
                    addClass( gridItem, 'directory__grid__item--show' );
                } else {
                    removeClass( gridItem, 'directory__grid__item--show' )
                }
            } );
            if ( thereIsResult ) {
                hideElement( $( '#no_filter__result' ) )
            } else {
                showElement( $( '#no_filter__result' ) )
            }
        }
    }

};

// Open search field
function searchBox () {
    const searchIcon = document.querySelector( '.search-icon' );
    searchIcon.addEventListener( 'click', ( e ) => {
        e.preventDefault();
        document.querySelector( '.search-form input' ).focus();
        document.querySelector( '.search-form' ).style.top = "0px";
    } )
}
// Close search field
function closeSearchBox () {
    const searchCloseIcon = document.querySelector( '.search-close-icon' );
    searchCloseIcon.addEventListener( 'click', ( e ) => {
        e.preventDefault();
        document.querySelector( '.search-form' ).style.top = "-100px";
    } )
}

searchBox()
closeSearchBox()


//Let me start the mobile nav script here please

function openNav(){
    document.getElementById("innerd").style.display = "flex";
    document.getElementById("openbtn").style.display = "none";
}

function closeNav(){
    document.getElementById("innerd").style.display = "none";
    document.getElementById("openbtn").style.display = "block";
}