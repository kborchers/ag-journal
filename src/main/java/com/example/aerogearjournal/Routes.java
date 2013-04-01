/*
 * JBoss, Home of Professional Open Source
 * Copyright 2012, Red Hat, Inc., and individual contributors
 * by the @authors tag. See the copyright.txt in the distribution for a
 * full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.example.aerogearjournal;

import com.example.aerogearjournal.model.Note;
import com.example.aerogearjournal.rest.NoteEndpoint;

import org.jboss.aerogear.controller.router.AbstractRoutingModule;
import org.jboss.aerogear.controller.router.MediaType;
import org.jboss.aerogear.controller.router.RequestMethod;
import static org.jboss.aerogear.controller.router.parameter.Parameter.*;
import org.jboss.aerogear.controller.router.rest.pagination.Paginated;
import org.jboss.aerogear.controller.router.rest.pagination.PaginationInfo;

public class Routes extends AbstractRoutingModule
{

   @Override
   public void configuration() throws Exception
   {

      route()
            .from("/notes")
            .on(RequestMethod.GET)
            .consumes(JSON)
            .produces(JSON)
            .to(NoteEndpoint.class).listAll(param(PaginationInfo.class));
      route()
            .from("/notes")
            .on(RequestMethod.POST)
            .consumes(JSON)
            .produces(JSON)
            .to(NoteEndpoint.class).create(param(Note.class));
      route()
            .from("/notes/{id}")
            .on(RequestMethod.DELETE)
            .consumes(JSON)
            .produces(JSON)
            .to(NoteEndpoint.class).deleteById(param(Long.class));
      route()
            .from("/notes/{id}")
            .on(RequestMethod.GET)
            .consumes(JSON)
            .produces(JSON)
            .to(NoteEndpoint.class).findById(param(Long.class));
      route()
            .from("/notes/{id}")
            .on(RequestMethod.PUT)
            .consumes(JSON)
            .produces(JSON)
            .to(NoteEndpoint.class).update(param(Long.class), param(Note.class));

   }

   private Long parseLong(String param)
   {
      Long parsedLong = null;
      try
      {
         parsedLong = Long.getLong(param);
      }
      catch (NumberFormatException e)
      {
         //TODO
      }
      finally
      {
         return parsedLong;
      }
   }

}
