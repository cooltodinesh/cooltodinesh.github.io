var response = {};

getPromotionId("m").then(function (p) {
   $.ajax({
        url: 'https://api.adcast.me/api/v1/end_users/campaign/'+getParameterByName('pid'),        
        type: 'get',
        headers: {
            sc: p
        },
        success:function(data){
            // Whatever you want to do after the form is successfully submitted
            response = data;

            // demo test data
            response = {
            "branding_info": {
                "text-primary": "color: #5c286e !important",
                "gradient-container": "background: linear-gradient(to bottom, antiquewhite, #79a2a078); background-attachment: fixed;",         
                "btn-primary": "background-color: #841d54; border-color: #841d54;",
                "text-muted": ""
            },
            "advertiser": {
                "id": 2,
                "name": "Myntra",
                "email": "mrinaltrivs27@hotmail.com",
                "mobile_number": "7760743377",
                "address": null,
                "category": "real_estate",
                "description": "Myntra is a one stop shop for all your fashion and lifestyle needs. Being India's largest e-commerce store for fashion and lifestyle products, Myntra aims at providing a hassle free and enjoyable shopping experience to shoppers across the country with the widest range of brands and products on its portal. The brand is making a conscious effort to bring the power of fashion to shoppers with an array of the latest and trendiest products available in the country.",
                "logo": "https://imgeng.jagran.com/images/2021/jan/Myntra-805x530-1-700x4611611985286383.jpg",
                "website": "https://www.myntra.com"
            },
            "ad_campaign": {
                "id": 1,
                "title": "✯ Clearance Sale 2022 - Myntra ✯",
                "description": "Gone are the days when one had to wait all year to experience a sale. Budget-friendly online shopping in India has been made quick and easy with the introduction of coupon codes. Myntra too has chosen to offer first-time shoppers and dedicated buyers a set of exclusive coupon codes to help them save a significant amount on their shopping purchases. Get flat 80% off on branded apparels, footwear and accessories for men, women online at Myntra. Easy returns and exchanges COD available.",
                "category": "other",
                "contact_addresses": "102, B-Wing Business square, Chakala andheri\nMumbai, Maharashtra\nIndia, 400095",
                "contact_phones": "7760963311",
                "starts_on": "2022-07-26T23:04:35.506+05:30",
                "ends_on": "2022-08-31T22:39:00.000+05:30",
                "eqnuire_now_flag": null,
                "eqnuire_now_info": [
                {
                    "label": "Name",
                    "value": "name",
                    "is_multiline": false
                },
                {
                    "label": "Mobile No.",
                    "value": "mobile_number",
                    "is_multiline": false
                },
                {
                    "label": "Address",
                    "value": "address",
                    "is_multiline": true
                }
                ],
                "is_location_restricted": false,
                "location_info": [],
                "radial_distance": null,
                "redirection_flag": true,
                "redirection_info": {
                "link": "https://adcast.me/",
                "caption": "REGISTER NOW"
                },
                "slug": "adcast-launch-07-26.600",
                "status": "active",
                "tags": [
                "travel",
                "relax",
                "outing"
                ],
                "terms_and_conditions": '\n<h2 class="mb-4 text-primary" style="color: #5c286e !important">Terms and Conditions</h2>\n<span class="text-muted" style="">\n<p class="mb-0" style="margin-bottom: 20px">What is the Offer?</p>\n<p class="mb-0" style="margin-bottom: 20px">1. The following is the Offer subject to the Terms and Conditions elaborated hereunder.</p>\n                                <p class="mb-0" style="margin-bottom: 20px">2. Top 1 spender gets MacBook Air 2020 (the minimum realized shopping value of Rs 80,000/- from multiple orders is required to be eligible for the Prize of MacBook Air 2020)</p>\n</span>\n',
                "advertiser_id": 2,
                "anchor_image": "https://assets.myntassets.com/assets/images/retaillabs/2021/9/24/5cad4760-8baa-49b2-ba61-f5e726eed5a31632491715639-HP-Banner-thin.jpg",
                "banner_image": null,
                "call_me_back_flag": true,
                "created_at": "2022-07-26T22:44:16.586+05:30",
                "updated_at": "2022-07-31T00:51:55.477+05:30"
            },
            "ad_platform": {
                "id": 1,
                "platform_link": "frCfycVq",
                "platform_type": "ad_cast"
            }
            }
            // todo enable
            // r1();
            setPage();
        },
        error: function () { 
            $("#no_such_ad_section").show();
            // alert('please try again later');
        }
    }); 
});

function r1() {
    $.ajax({
        // todo
        url: 'https://api.adcast.me/api/v1/end_users/actions/page_view',
        type: 'post',
        headers: {
            'Content-Type': 'application/json'                    
        },
        data: JSON.stringify({
            "sv": getEnv(),
            "ad_promotion_platform_id": response['ad_platform']['id']
        }),
        success: function(data) {
        }
    });
}


function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
} 


function setPage() {
    if(typeof response["branding_info"] == 'undefined') {
        response["branding_info"] = {
            "text-primary": "color: #5c286e !important",
            "gradient-container": "background: linear-gradient(to bottom, antiquewhite, #79a2a078); background-attachment: fixed;",         
            "btn-primary": "background-color: #841d54; border-color: #841d54;",
            "text-muted": ""
        }
    }
    // set theme
    $(".text-primary").attr("style", response['branding_info']["text-primary"]);
    $(".gradient-container").attr("style", response['branding_info']["gradient-container"]);
    $(".btn-primary").attr("style", response['branding_info']["btn-primary"]);
    $(".text-muted").attr("style", response['branding_info']["text-muted"])
    
    $('#hero_image').attr("src", response['ad_campaign']['anchor_image']);
    $('#ad_title').text(response['ad_campaign']['title']);
    $('#ad_description').text(response['ad_campaign']['description']);
        
    if(typeof response['ad_campaign']['redirection_info'] != 'undefined') {
        // todo redirect directly if ad_type is passive
        if (typeof response['ad_campaign']['ad_campaign_category_info'] != 'undefined' && response['ad_campaign']['ad_campaign_category_info']['category'] == 'passive') {
            $('#register_now_btn').on('click', function(){
                $("a#register_now_btn").attr("href",response['ad_campaign']['redirection_info']['link']);
            });
        } else {
            $("#register_now_btn").text(response['ad_campaign']['redirection_info']['caption']);
        }
                
        $("a#register_now_btn").show();
    }

    if(typeof response['ad_campaign']['terms_and_conditions'] != 'undefined' && response['ad_campaign']['terms_and_conditions'] != null) {
        $("#generic_section").html(response['ad_campaign']['terms_and_conditions']);
        $('#tnc_section').show();
    }  

    showEnquiryForm = ((typeof response['ad_campaign']['eqnuire_now_info'] != undefined) && (response['ad_campaign']['eqnuire_now_info'].length > 0))

    if(showEnquiryForm) {

        enquiry_custom = response['ad_campaign']['eqnuire_now_info'];
        for(i=0; i< enquiry_custom.length; i++) {
            for_field = 'enq_' + i;
            field_name = enquiry_custom[i]['value'];
            
            switch(field_name) {
              case 'name':
                $('#enquire_now_form').append('<div class="mb-3"><label for="'+for_field+'">'+enquiry_custom[i]['label']+'</label><input type="text" class="form-control" id="name" name="name" placeholder="Mark Twain"></div>');
                break;

              case 'mobile_number':
                $('#enquire_now_form').append('<div class="mb-3"><label for="'+for_field+'">'+enquiry_custom[i]['label']+'</label><input type="tel" class="form-control" id="mobile_number" name="mobile_number" placeholder="+91"></div>');
                break;                

              case 'address':
                $('#enquire_now_form').append('<div class="mb-3"><label for="'+for_field+'">'+enquiry_custom[i]['label']+'</label><textarea class="form-control" id="address" name="address" placeholder="Enter address"></textarea></div>');
                break;

              // todo
              case 'custom':
                // code block
                break; 

              default:
                // code block
            }                    
        }            
    }

    if (response["ad_campaign"]['call_me_back_flag']) {
        $("#request_callback_div").show();
    }

    // todo complete this
    if(response["ad_campaign"]['call_me_back_flag'] || showEnquiryForm) {                
        debugger;
        $("#get_in_touch_section").show();
        // todo set the forms col width based on which ones are to be shown
    }

    if(response['ad_campaign']['redirection_flag']) {
        $(".redirect_to_advertiser").show();
    }            

    $('#about_adv_name').text('About '+ response['advertiser']['name']);
    $('#about_adv_image').attr("src", response['advertiser']['logo']);
    $('#about_adv_desc').text(response['advertiser']['description']);
    $('#about_adv_website').text('Website: '+ response['advertiser']['website'])
                    
    
    // update footer
    // deploy            
    $(".outer-container").show();

}

function callbackRequestSubmit(action_name) {
    // page_redirect || request_call_back

    form_fields = $('#request_callback_form').serializeArray();
    data_to_send = {};
    for(i=0; i<form_fields.length; i++){
        if(form_fields[i]['value'] == '') {                    
            alert('please fill the form');
            return;                    
        }
        data_to_send[form_fields[i]['name']] = form_fields[i]['value'];
    }

    $.ajax({
        // todo
        url: 'https://api.adcast.me/api/v1/end_users/actions/'+ action_name,
        type: 'post',
        headers: {
            'Content-Type': 'application/json'                    
        },
        data: JSON.stringify({
            "sv": getEnv(),
            "ad_promotion_platform_id": response['ad_platform']['id'],
            "request_data": data_to_send
        }),
        success: function(data) {
            if (action_name == 'page_redirect') {
                window.location = response['ad_campaign']['redirection_info']['link']
            }
            if(action_name == 'call') {
                window.location = "tel:"+response["ad_campaign"]["contact_phones"]
            }
        },
        error: function () { 
            alert('please try again later') 
        }
    });
}
       

function submitEnquiry(){                
    
    form_fields = $('#enquiry_form').serializeArray();
    data_to_send = {};
    for(i=0; i<form_fields.length; i++){
        if(form_fields[i]['value'] == '') {
            alert('please fill the form');
            return;
        }
        data_to_send[form_fields[i]['name']] = form_fields[i]['value'];
    }

    $.ajax({
        url: 'https://api.adcast.me/api/v1/end_users/actions/enquiry',
        type: 'post',
        headers: {
            'Content-Type': 'application/json'                    
        },
        data: JSON.stringify({
            "sv": getEnv(),
            // todo cehck
            "ad_promotion_platform_id": response['ad_platform']['id'],
            "request_data": data_to_send
        }),
        success:function(){
            
        },
        error: function () { 
            alert('please try again later') 
        }
    });
};

function rand(length, current) {
      current = current ? current : '';
      return length ? rand(--length, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 60)) + current) : current;
}

function getEnv() {
    env = localStorage.getItem("env");
    if (env == null) {
        create_env = rand(25);
        localStorage.setItem("env", create_env);
        return create_env;    
    } else {
        return env;
    }            
}        

async function getPromotionId() {
        env = getEnv();                

        // encode as UTF-8
        const msgBuffer = new TextEncoder().encode(env);                    

        // hash the message
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

        // convert ArrayBuffer to Array
        const hashArray = Array.from(new Uint8Array(hashBuffer));

        // convert bytes to hex string                  
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
}