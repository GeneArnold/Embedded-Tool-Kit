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

 define(['jquery'], function($) {
 
 var externalUsage : {	
		config: {},
			
		// URL of the JRS
		jrsUrl: "http://localhost:8080/jasperserver-pro6",

		// JRS login username
		jrsUsername: "jasperadmin",

		// JRS login password
		jrsPassword: "jasperadmin",

		// JRS login organization
		jrsOrganization: "organization_1",
		
		dashBoardDesigner : {

			// The folder on JRS that will be searched for reports to add.
			folderUri: "/public/Dashboard_Reports", 

			// Indicates whether JRS should be searched for reports only
			// in the given folder (see option folderUri above) or also
			// in all sub-folders.
			recursive: false,

			// URL of the Dashboardsaver servlet
			dashboardSaver: "dashboard.do",

			// Initial height of the application, in px
			defaultApplicationHeight: 800,

			// Initial width of reports when added to a dashboard, in px
			defaultReportWidth: 400,

			// Initial height of reports when added to a dashboard, in px
			defaultReportHeight: 300
		},
		getVizLibraryUrl: function(){
			var libraryUrl = this.jrsUrl + "/client/visualize.js";
			if( this.targetJrsUrl !== undefined){
				libraryUrl = libraryUrl + "?baseUrl=" + this.targetJrsUrl;
			}
			return libraryUrl;
		}
			
	}	
	
	
	
	return externalUsage;
	
});