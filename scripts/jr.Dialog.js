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

define(['jquery','vizjs_toolkit/GenericHyperlinkHandler'], function($,GenericVizAction) {

	function DialogViz(arrHyperlinks){
		GenericVizAction.call(this,arrHyperlinks);
	}
	
	DialogViz.prototype = Object.create(GenericVizAction.prototype); 
	
	// Set the "constructor" property to refer to DialogViz
	DialogViz.prototype.constructor = DialogViz;

	// Replace the "_handleHyperlinkClick" method
	DialogViz.prototype.handleHyperlinkClick = function(hyperlink){
		GenericVizAction.prototype.handleHyperlinkClick.call(this,hyperlink);
		
		var divId = null;
		
		var mode = this.getMode();

		if(mode == "dialog"){
			divId = GenericVizAction.prototype.openDialog.call(this,hyperlink);
			
		}else if(mode == "div"){
			//no action needed, the div is there already
			divId = "#" + (hyperlink.params.container || "contentDiv");
		}		
		
		var d_content = null;
		var d_content_type = hyperlink.params.content_type  ||  "";
		
		if (d_content_type=="frame"){
			//here  we create a frame object using the url in the hyperlink
			var d_content_frame_url = hyperlink.params.frame_url  ||  "";
			d_content = '<iframe src="'+d_content_frame_url+'" frameborder="0" scrolling="yes" id="myFrame" width="100%" height="100%"></iframe>';
		}else{
			//In this case we just put the content in the div (both for dialog and div mode
			d_content = hyperlink.params.content  ||  "";
		}
		$(divId).html(d_content);
	};

	return DialogViz;

});
