/**
* signup.js
**/
var app=angular.module('signupApp', []);
	app.directive('passwordMatch', function() {
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {			 
				var firstPassword = '#' + attrs.passwordMatch;
				elm.add(firstPassword).on('blur', function () {
					scope.$apply(function () {					
						if(ctrl.$error.required==false || ctrl.$error.required == undefined){
							var v = elm.val()===$(firstPassword).val();
							ctrl.$setValidity('passwordMatch', v);
						}					
					});
				});
			}
		};
	});
	app.controller('SignUpController', ['$scope', function($scope) {
		$scope.signupFormData={};
		$scope.msg="";
		$scope.signupFormData.submitted=false; 
        $scope.validateEmail=function(e,form){
		  var emailValidate=(/comcast.com$/ig).test(form.email.$viewValue);
			if(form.email.$valid && emailValidate){
			  form.email.$setValidity('emailValidate', false);			
			}else if(form.email.$invalid && !emailValidate && form.email.$error.emailValidate){
			  form.email.$setValidity('emailValidate', true);
			}
		}		
        $scope.submitForm=function(e,form){ 
        	e.preventDefault();
            // Trigger validation flag.
            $scope.signupFormData.submitted = true;
            // If form is invalid, return and let AngularJS show validation errors. 			
            if (form.$invalid) {
                $scope.status="danger";			
                $scope.msg="Please correct the following errors to submit.";          	
                return;
            }			
            //$("#signupForm").submit();
			$scope.status="success";
			$scope.msg="Form submitted successfully";
        };
	}]);