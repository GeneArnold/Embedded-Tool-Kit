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
 * @author: Gianluca Natali (gnatali@tibco.com)
 * 
 */

define(['jquery','vizjs_toolkit/core/visualizeHelper', 'vizjs_toolkit/GenericHyperlinkHandler'], function($,VisualizeHelper,HlHandler) {
	
	
	var VizHyperlink = function(arrHyperlinks) {
        HlHandler.call(this,arrHyperlinks);
    };
	
	//VizHyperlink.prototype = Object.create(HlHandler.prototype); 
	VizHyperlink.prototype = new HlHandler
	
	// Set the "constructor" property to refer to VizHyperlink
	VizHyperlink.prototype.constructor = VizHyperlink;
	
    VizHyperlink.prototype = {
        
		/* In our idea Visualize should be already 
		* loaded and always available from any javascript.
		* This service should return an object already loaded 
		* in the window object If undefined instantiate a viz object. 
		* Most probably this logic could be incapsulated in a common 
		* service javascript obj, to make it available through requireJS 
		* to all javascript that will need to use visualize in JRS
		*/
		getViz: function(){
			return new VisualizeHelper().getVizInstance();
		},
		register: function() {
			HlHandler.prototype.register.call(this);
        },
        handleInteraction: function(evt) {
            HlHandler.prototype.handleInteraction.call(this,evt);
        },
		/* This function will be inherited from the child objects. 
		 * It is the function to override in order to add custom HyperlinkHandling behaviors
		*/
		handleHyperlinkClick: function(hyperlink) {
			HlHandler.prototype.handleHyperlinkClick.call(this,hyperlink);
                       
        },
		//getMode
		getMode: function(){
			return HlHandler.prototype.getMode.call(this);
		},
		openDialog : function(hyperlink, reportDivId){
		
			return HlHandler.prototype.openDialog.call(this,hyperlink, reportDivId);
		},
		getHyperlinkData: function(id) {
            return HlHandler.prototype.getHyperlinkData.call(this,id);
        }		
        
    };

    return VizHyperlink;
});
