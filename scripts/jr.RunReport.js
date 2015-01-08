/*
 * Copyright (C) 2005 - 2014 TIBCO Software Inc. All rights reserved.
 * http://www.jaspersoft.com.
 *
 * Unless you have purchased  a commercial license agreement from Jaspersoft,
 * the following license terms  apply:
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License  as
 * published by the Free Software Foundation, either version 3 of  the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero  General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public  License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */


/**
 * @author: Eugene Arnold (earnold@tibco.com), Gianluca Natali (gnatali@tibco.com)
 * 
 */

define(['jquery','vizjs_toolkit/VizHyperlinkHandler'], function($,GenericVizAction) {

	function ReportExecution(arrHyperlinks){
		GenericVizAction.call(this,arrHyperlinks);
		this.r_container = null;
		this.reportParameters = {};
	}
	
	ReportExecution.prototype = Object.create(GenericVizAction.prototype); 
	
	// Set the "constructor" property to refer to ReportExecution
	ReportExecution.prototype.constructor = ReportExecution;

	// Replace the "_handleHyperlinkClick" method
	ReportExecution.prototype.handleHyperlinkClick = function(hyperlink){
		//Calling the generic logic in the parent method
		GenericVizAction.prototype.handleHyperlinkClick.call(this,hyperlink);
		
		var mode = this.getMode();

		if(mode == "dialog"){
			this.r_container = GenericVizAction.prototype.openDialog.call(this,hyperlink);
			
		}else if(mode == "div"){
			//no action needed, the div is there already
			this.r_container =  "#" + (hyperlink.params.container || "report");
		}			
		
		this.runReport(hyperlink);
		


		
	};
	
	ReportExecution.prototype.runReport = function(hyperlink){
		//getting the parameters from hyperlink. The params have 
		var paramsList = {};
		$.each(hyperlink.params,
			function(index,value){
				if (index.substring(0, 2) === "p_"){
					var v = [];
					v.push(value);
					paramsList[index.substring(2)] = v;
				}
			}
		);  
		
		//getting the resource uri from hyperlink
		var r_resource = hyperlink.params.resource || "";
		var r_container = this.r_container;
		
		this.getViz().done(function(v) {
			this.report = v.report({
                resource: r_resource,
                container: r_container,
                params: paramsList
            });
		});
	}
	
	return ReportExecution;



});
