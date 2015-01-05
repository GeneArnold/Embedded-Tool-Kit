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

define(['jquery','jr.GenericInternalViz'], function($,GenericVizAction) {

	function ReportExecution(arrHyperlinks){
		GenericVizAction.call(this,arrHyperlinks);
	}
	
	ReportExecution.prototype = Object.create(GenericVizAction.prototype); 
	
	// Set the "constructor" property to refer to ReportExecution
	ReportExecution.prototype.constructor = ReportExecution;

	// Replace the "_handleHyperlinkClick" method
	ReportExecution.prototype.handleHyperlinkClick = function(hyperlink){
		//Calling the generic logic in the parent method
		GenericVizAction.prototype.handleHyperlinkClick.call(this,hyperlink);

		var r_resource = ((hyperlink.params.resource)  ?  hyperlink.params.resource : "");
		var r_container = ((hyperlink.params.container)  ?  hyperlink.params.container : "#report");
		var data = {};

		if(hyperlink.params){
			$.each(hyperlink.params,
				function(index,value){
					if (index.substring(0, 6) === "param_"){
						var v = [];
						v.push(value);
						data[index.substring(6)] = v;
					}
				}
			); 
		}

		var report;

		this.getViz().done(function(v) {
			report = v.report({
                resource: r_resource,
                container: r_container,
                params:data
            });
		});
	};
	
	return ReportExecution;



});
