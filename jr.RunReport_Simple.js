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
 * @author: Narcis Marcu (nmarcu@jaspersoft.com)
 * @version: $Id: jr.ReportExecution.js 47331 2014-07-18 09:13:06Z kklein $
 */

define(['jquery'], function($) {

    $.getScript("http://localhost:8080/jasperserver-pro-6/client/visualize.js?_opt=false");

    var ReportExecution = function(arrHyperlinks) {
        this.hyperlinks = arrHyperlinks;
        this.reportInstance = null;
        this.reportContainer = null;
    };

    ReportExecution.prototype = {
        register: function() {
            var it = this;
            $(it.hyperlinks[0].selector).on('click', function(evt) {
                var hlData = it._getHyperlinkData($(this).attr('data-id'));
                if (hlData) {
                    it._handleHyperlinkClick(hlData);
                }
            }).css('cursor', 'pointer');
        },
        handleInteraction: function(evt) {
            if ('hyperlinkClicked' == evt.type) {
                var hlData = this._getHyperlinkData(evt.data.hyperlink.id);
                if (hlData) {
                    this._handleHyperlinkClick(hlData);
                }
            }
        },

        // internal functions
        _getHyperlinkData: function(id) {
            var hlData = null;
            $.each(this.hyperlinks, function(i, hl) {
                if (id === hl.id) {
                    hlData = hl;
                    return false; //break each
                }
            });
            return hlData;
        },
        _handleHyperlinkClick: function(hyperlink) {
            
            var d_width = ((hyperlink.params.width)  ?  hyperlink.params.width : "auto");
            var d_height = ((hyperlink.params.height)  ?  hyperlink.params.height : "auto");
            var d_title = ((hyperlink.params.title)  ?  hyperlink.params.title : "Dialog");
            var d_content = ((hyperlink.params.content)  ?  hyperlink.params.content : "");
            var r_resource = ((hyperlink.params.resource)  ?  hyperlink.params.resource : "");
            var data = {};

            $.each(hyperlink.params,
                function(index,value){
                    if (index.substring(0, 6) === "param_"){
                        var v = [];
                        v.push(value);
                        data[index.substring(6)] = v;
                    }
                }
            );  
            
            if ( $( "#dialog" ).length == 0 ) {
                var new_dialog = $('<div id="dialog"><div id="report"></div></div>');
                new_dialog.insertAfter('#reportContainer');
            }

            $("#dialog").dialog({ height: d_height, width: d_width, title: d_title });



            // create a deferred
            var vizInstanceReady = new $.Deferred();

            visualize({
                auth: {
                    // if we are at this point we are already authenticated, so hook Viz.js auth to do nothing
                    loginFn: function (properties, request) {
                        // jQuery here is just for sample, any resolved Promise will work
                        return (new $.Deferred()).resolve();
                    }
                }
            }, function(v) {
                // resolve our deferred with viz instance
                vizInstanceReady.resolve(v);
            });

            // now in done callback of our deferred we can use our pre-configured viz instance
            vizInstanceReady.done(function(v) {
                console.log(v);
                var report = v.report({
                    resource: r_resource,
                    container: "#report",
                    params:data
                });
            });

            // you can assign as many done callbacks as you want, callback function will be executed ONLY AFTER deferred is resolved
            //vizInstanceReady.done(function(v) {  });
        }
    };

    return ReportExecution;
});
