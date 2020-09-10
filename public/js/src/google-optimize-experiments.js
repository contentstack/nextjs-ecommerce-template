
function execute_google_optimize_experiments(settings, experimentId, variantId) {
    if (!settings) {
        console.log(' - A/B test data not available. Please check settings.');
        return;
    }

    var is_navbar_test = settings.sticky_navbar_a_b_test 
        && settings.sticky_navbar_a_b_test.enable_experiment
        && settings.sticky_navbar_a_b_test.experiment_id == experimentId;

    if (is_navbar_test) {
        do_sticky_navbar_test(variantId);
    } else {
        console.log('- No tests found to execute. Did you forget to update the Experiemnt ID in Contentstack?');
    }
}

function do_sticky_navbar_test(variantId) {
    console.log('- Executing Sticky Navbar Test.');

    if (variantId == 1) {
        console.log('- Fixed menu is ENABLED.');
        $("body").addClass("sd-menu-fixed");
    } else {
        console.log('- Fixed menu is DISABLED.');
    }
}