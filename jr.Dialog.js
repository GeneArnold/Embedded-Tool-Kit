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

	function DialogViz(arrHyperlinks){
		GenericVizAction.call(this,arrHyperlinks);
	}
	
	DialogViz.prototype = Object.create(GenericVizAction.prototype); 
	
	// Set the "constructor" property to refer to DialogViz
	DialogViz.prototype.constructor = DialogViz;

	// Replace the "_handleHyperlinkClick" method
	DialogViz.prototype.handleHyperlinkClick = function(hyperlink){
		GenericVizAction.prototype.handleHyperlinkClick.call(this,hyperlink);

		//var uri = "http://localhost:8080/jasperserver-pro/flow.html?_flowId=viewReportFlow&standAlone=true&_flowId=viewReportFlow&ParentFolderUri=%2Fpublic%2FSamples%2FReports&reportUnit=%2Fpublic%2FSamples%2FReports%2F01._Geographic_Results_by_Segment_Report&viewAsDashboardFrame=true"
		// if ( $( "#dialog" ).length == 0 ) {
		//     var new_dialog = $('<div id="dialog"><div id="report"></div><br><iframe id="dialog_frame" width="100%" height="90%" src="'+uri+'"></iframe></div>');
		//     new_dialog.insertAfter('#reportContainer');
		// }

		// if ( $( "#dialog_frame" ).length == 0 ) {
		//     var new_dialog_frame = $('<iframe id="dialog_frame" src="http://localhost:8080/jasperserver-pro"></iframe>');
		//     new_dialog.insertAfter('#report');
		// }


		//$("#dialog").dialog({ height: d_height, width: d_width, title: d_title });
		var d_content = ((hyperlink.params.content)  ?  hyperlink.params.content : "");
		$("#report").html(d_content);
	};

	return DialogViz;

});
