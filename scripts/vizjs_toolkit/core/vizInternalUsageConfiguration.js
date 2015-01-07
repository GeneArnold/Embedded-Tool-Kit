/*
 * ========================================================================
 * visualizeHelper.js : v0.1.0
 * 
 * Store here the configurations for your environment
 * ========================================================================
 * Copyright 2014
 * Author: Gianluca Natali (https://github.com/gianlucanatali)
 *
 * Unless you have purchased a commercial license agreement from Jaspersoft Inc., the following license terms apply:
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the 
 * GNU Affero General Public License as published by the Free Software Foundation, either version 3 
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public 
 * License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License 
 * along with this program. If not, see http://www.gnu.org/licenses/.
 * ======================================================================== 
 */

 define(['jquery', 'vizjs_toolkit/configuration/jrsConfig'], function($, jrsConfig) {	

	var internalUsage = {	
		config: {
			auth: {
				// if we are at this point we are already authenticated, so hook Viz.js auth to do nothing
				loginFn: function (properties, request) {
					// jQuery here is just for sample, any resolved Promise will work
					return (new $.Deferred()).resolve();
				}
			}	
		},
		
		// URL of the JRS
		jrsUrl: jrsConfig.getJrsUrl(),
		
		getVizLibraryUrl: function(){
			var libraryUrl = this.jrsUrl + "/client/visualize.js";
			if( this.targetJrsUrl !== undefined){
				libraryUrl = libraryUrl + "?baseUrl=" + this.targetJrsUrl;
			}
			return libraryUrl;
		}
			
	}
	
	return internalUsage;
});